const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const DATA_FILE = path.join(DATA_DIR, "billing-data.json");
const MENU_FILE = path.join(DATA_DIR, "menu.json");
const FLAVOURS_FILE = path.join(DATA_DIR, "flavours.json");

const DEFAULT_MENU = [
  { id: "flavor-stick-gola", name: "Flavor Stick Gola", category: "Ice Gola", price: 50 },
  { id: "rabdi-stick-gola", name: "Rabdi Stick Gola", category: "Ice Gola", price: 70 },
  { id: "rainbow-stick-gola", name: "Rainbow Stick Gola", category: "Ice Gola", price: 60 },
  { id: "dry-fruit-rabdi-stick-gola", name: "Dry Fruit Rabdi Stick Gola", category: "Ice Gola", price: 80 },
  { id: "flavor-ice-dish", name: "Flavor Ice Dish", category: "Ice Dish", price: 60 },
  { id: "rabdi-ice-dish", name: "Rabdi Ice Dish", category: "Ice Dish", price: 100 },
  { id: "dry-fruit-rabdi-ice-dish", name: "Dry Fruit Rabdi Ice Dish", category: "Ice Dish", price: 150 },
  { id: "dry-fruit-rabdi-ice-cream-dish", name: "Dry Fruit Rabdi Ice Cream Dish", category: "Ice Dish", price: 180 },
  { id: "punjabi-lassi", name: "Punjabi Lassi", category: "Lassi", price: 50 },
  { id: "flavor-cream-lassi", name: "Flavor Cream Lassi", category: "Lassi", price: 60 },
  { id: "dry-fruit-flavor-cream-lassi", name: "Dry Fruit Flavor Cream Lassi", category: "Lassi", price: 80 },
  { id: "dry-fruit-ice-cream-lassi", name: "Dry Fruit Ice Cream Lassi", category: "Lassi", price: 100 },
  { id: "flavor-sharbat", name: "Flavor Sharbat", category: "Sharbat", price: 50 },
  { id: "rabdi-flavor-sharbat", name: "Rabdi Flavor Sharbat", category: "Sharbat", price: 70 },
  { id: "dry-fruit-rabdi-sharbat", name: "Dry Fruit Rabdi Sharbat", category: "Sharbat", price: 80 },
  { id: "dry-fruit-rabdi-ice-cream-sharbat", name: "Dry Fruit Rabdi Ice Cream Sharbat", category: "Sharbat", price: 100 },
  { id: "mix-fruit-juice-small", name: "Mix Fruit Juice Small", category: "Extras", price: 50 },
  { id: "mix-fruit-juice-large", name: "Mix Fruit Juice Large", category: "Extras", price: 60 },
  { id: "lemon-soda", name: "Lemon Soda", category: "Extras", price: 20 },
  { id: "lemon-sharbat", name: "Lemon Sharbat", category: "Extras", price: 30 },
  { id: "masala-chaas", name: "Masala Chaas", category: "Extras", price: 20 },
  { id: "extra-colour", name: "Extra Colour", category: "Extras", price: 10 },
  { id: "parcel-charge", name: "Parcel Charge", category: "Extras", price: 10 }
];

const DEFAULT_FLAVOURS = {
  sweet: ["Kaju Mava", "Watermelon", "Kesar Mava", "Vanilla Mava", "Choco Chocolate", "Guava", "Rajbhog", "Shahi Gulab", "Coconut", "Chikoo"],
  khataMitha: ["Orange", "Kala Khatta", "Kolthu", "Jamun", "Rimzim", "Blueberry", "Pineapple", "Mazza Mango", "Kacchi Keri", "Falsa"]
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".command": "text/plain; charset=utf-8"
};

function todayKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function emptyData(nextBill = 1, history = {}) {
  return { date: todayKey(), nextToken: 1, nextBill, bills: [], history };
}

function ensureDataFile() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(emptyData(), null, 2));
  }
  if (!fs.existsSync(MENU_FILE)) {
    fs.writeFileSync(MENU_FILE, JSON.stringify(DEFAULT_MENU, null, 2));
  }
  if (!fs.existsSync(FLAVOURS_FILE)) {
    fs.writeFileSync(FLAVOURS_FILE, JSON.stringify(DEFAULT_FLAVOURS, null, 2));
  }
}

function readData() {
  ensureDataFile();
  let data;
  try {
    data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    data = emptyData();
  }
  data.history = data.history || {};
  data.bills = data.bills || [];
  if (data.date !== todayKey()) {
    if (data.bills.length) data.history[data.date] = data.bills;
    data = emptyData(data.nextBill || 1, data.history);
    writeData(data);
  }
  return data;
}

function writeData(data) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function readMenu() {
  ensureDataFile();
  try {
    const menu = JSON.parse(fs.readFileSync(MENU_FILE, "utf8"));
    return Array.isArray(menu) ? menu : DEFAULT_MENU;
  } catch {
    return DEFAULT_MENU;
  }
}

function writeMenu(menu) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(MENU_FILE, JSON.stringify(menu, null, 2));
}

function readFlavours() {
  ensureDataFile();
  try {
    const flavours = JSON.parse(fs.readFileSync(FLAVOURS_FILE, "utf8"));
    return {
      sweet: Array.isArray(flavours.sweet) ? flavours.sweet : DEFAULT_FLAVOURS.sweet,
      khataMitha: Array.isArray(flavours.khataMitha) ? flavours.khataMitha : DEFAULT_FLAVOURS.khataMitha
    };
  } catch {
    return DEFAULT_FLAVOURS;
  }
}

function writeFlavours(flavours) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FLAVOURS_FILE, JSON.stringify(flavours, null, 2));
}

function cleanFlavourList(list) {
  return [...new Set((Array.isArray(list) ? list : []).map((item) => String(item || "").trim()).filter(Boolean))];
}

function formatToken(number) {
  return String(number).padStart(3, "0");
}

function formatBill(number, date = todayKey()) {
  return `AID-${date}-${String(number).padStart(4, "0")}`;
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function publicAddress() {
  const nets = require("os").networkInterfaces();
  for (const addresses of Object.values(nets)) {
    for (const address of addresses || []) {
      if (address.family === "IPv4" && !address.internal) return address.address;
    }
  }
  return "localhost";
}

async function handleApi(req, res, pathname) {
  if (req.method === "GET" && pathname === "/api/flavours") {
    return sendJson(res, 200, readFlavours());
  }

  if (req.method === "PUT" && pathname === "/api/flavours") {
    const incoming = await readBody(req);
    const flavours = {
      sweet: cleanFlavourList(incoming.sweet),
      khataMitha: cleanFlavourList(incoming.khataMitha)
    };
    writeFlavours(flavours);
    return sendJson(res, 200, flavours);
  }

  if (req.method === "GET" && pathname === "/api/menu") {
    return sendJson(res, 200, readMenu());
  }

  if (req.method === "PUT" && pathname === "/api/menu") {
    const incoming = await readBody(req);
    const menu = Array.isArray(incoming) ? incoming : incoming.menu;
    if (!Array.isArray(menu)) return sendJson(res, 400, { error: "Menu must be an array" });
    const cleanMenu = menu.map((item) => ({
      id: String(item.id || item.name || crypto.randomUUID()).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      name: String(item.name || "").trim(),
      category: String(item.category || "Menu").trim(),
      price: Number(item.price || 0)
    })).filter((item) => item.name && item.price >= 0);
    writeMenu(cleanMenu);
    return sendJson(res, 200, cleanMenu);
  }

  if (req.method === "GET" && pathname === "/api/data") {
    return sendJson(res, 200, readData());
  }

  if (req.method === "PUT" && pathname === "/api/data") {
    const incoming = await readBody(req);
    const current = readData();
    const data = { ...current, ...incoming, history: incoming.history || current.history || {} };
    writeData(data);
    return sendJson(res, 200, data);
  }

  if (req.method === "POST" && pathname === "/api/bills") {
    const draft = await readBody(req);
    const data = readData();
    const bill = {
      id: crypto.randomUUID(),
      billNo: formatBill(data.nextBill, data.date),
      token: formatToken(data.nextToken),
      createdAt: new Date().toISOString(),
      customerName: draft.customerName || "",
      customerPhone: draft.customerPhone || "",
      items: draft.items || [],
      subtotal: Number(draft.subtotal || 0),
      discount: Number(draft.discount || 0),
      total: Number(draft.total || 0),
      paymentMode: draft.paymentMode || "Cash",
      status: "Pending"
    };
    data.bills.push(bill);
    data.nextBill += 1;
    data.nextToken += 1;
    writeData(data);
    return sendJson(res, 201, { bill, data });
  }

  const billMatch = pathname.match(/^\/api\/bills\/([^/]+)$/);
  if (req.method === "PATCH" && billMatch) {
    const patch = await readBody(req);
    const data = readData();
    const bill = data.bills.find((entry) => entry.id === billMatch[1]);
    if (!bill) return sendJson(res, 404, { error: "Bill not found" });
    Object.assign(bill, patch, { updatedAt: new Date().toISOString() });
    writeData(data);
    return sendJson(res, 200, { bill, data });
  }

  if (req.method === "POST" && pathname === "/api/close-day") {
    const data = readData();
    if (data.bills.length) data.history[data.date] = data.bills;
    const nextData = emptyData(data.nextBill, data.history);
    writeData(nextData);
    return sendJson(res, 200, nextData);
  }

  return sendJson(res, 404, { error: "Not found" });
}

function serveStatic(req, res, pathname) {
  const requestPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(ROOT, requestPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      return res.end("Not found");
    }
    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url.pathname);
    } else {
      serveStatic(req, res, url.pathname);
    }
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  const host = publicAddress();
  console.log(`Aaradhna billing server running`);
  console.log(`MacBook: http://localhost:${PORT}`);
  console.log(`Phone/tablet/TV: http://${host}:${PORT}`);
});
