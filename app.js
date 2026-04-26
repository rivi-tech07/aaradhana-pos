const defaultMenu = [
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
  { id: "parcel-charge", name: "Parcel Charge", category: "Extras", price: 10 },
  { id: "aaradhna-family-dish", name: "Aaradhna Family Dish", category: "Aaradhna Special", price: 499 },
  { id: "watermelon-family-blast", name: "Watermelon Family Blast", category: "Aaradhna Special", price: 299 },
  { id: "mango-special-dish", name: "Mango Special Dish", category: "Fruit Special Dish", price: 130 },
  { id: "pineapple-special-dish", name: "Pineapple Special Dish", category: "Fruit Special Dish", price: 130 },
  { id: "guava-special-dish", name: "Guava Special Dish", category: "Fruit Special Dish", price: 130 },
  { id: "strawberry-special-dish", name: "Strawberry Special Dish", category: "Fruit Special Dish", price: 130 },
  { id: "litchi-special-dish", name: "Litchi Special Dish", category: "Fruit Special Dish", price: 130 },
  { id: "chikoo-special-dish", name: "Chikoo Special Dish", category: "Fruit Special Dish", price: 130 },
  { id: "orange-creamsicle-dish", name: "Orange Creamsicle Dish", category: "Fruit Special Dish", price: 130 },
  { id: "choco-heaven-dish", name: "Choco Heaven Dish", category: "Chocolate & Fun", price: 130 },
  { id: "kitkat-special-dish", name: "KitKat Special Dish", category: "Chocolate & Fun", price: 130 },
  { id: "paan-special-dish", name: "Paan Special Dish", category: "Unique Special", price: 130 },
  { id: "rose-malai-special-dish", name: "Rose Malai Special Dish", category: "Unique Special", price: 130 },
  { id: "coconut-cooler-dish", name: "Coconut Cooler Dish", category: "Unique Special", price: 130 },
  { id: "rajwadi-matka-dish", name: "Rajwadi Matka Dish", category: "Premium Royal Dishes", price: 190 },
  { id: "kaju-special-dish", name: "Kaju Special Dish", category: "Premium Royal Dishes", price: 150 },
  { id: "rajbhog-dish", name: "Rajbhog Dish", category: "Premium Royal Dishes", price: 160 },
  { id: "rasgulla-dish", name: "Rasgulla Dish", category: "Premium Royal Dishes", price: 170 },
  { id: "saffron-special-dish", name: "Saffron Special Dish", category: "Premium Royal Dishes", price: 130 },
  { id: "rabdi-extra", name: "Rabdi", category: "Extras", price: 30 },
  { id: "dry-fruits-extra", name: "Dry Fruits", category: "Extras", price: 30 },
  { id: "ice-cream-extra", name: "Ice Cream", category: "Extras", price: 30 },
  { id: "cream-extra", name: "Cream", category: "Extras", price: 10 }
];

let menu = [...defaultMenu];
let flavours = {
  sweet: ["Kaju Mava", "Watermelon", "Kesar Mava", "Vanilla Mava", "Choco Chocolate", "Guava", "Rajbhog", "Shahi Gulab", "Coconut", "Chikoo"],
  khataMitha: ["Orange", "Kala Khatta", "Kolthu", "Jamun", "Rimzim", "Blueberry", "Pineapple", "Mazza Mango", "Kacchi Keri", "Falsa"]
};

const state = {
  activeCategory: "All",
  cart: {},
  paymentMode: "Cash",
  lastBill: null,
  editingBillId: null,
  data: fallbackData()
};

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const els = {
  categoryTabs: document.getElementById("categoryTabs"),
  itemGrid: document.getElementById("itemGrid"),
  searchInput: document.getElementById("searchInput"),
  cartList: document.getElementById("cartList"),
  customerNameInput: document.getElementById("customerNameInput"),
  customerPhoneInput: document.getElementById("customerPhoneInput"),
  discountInput: document.getElementById("discountInput"),
  subtotalAmount: document.getElementById("subtotalAmount"),
  grandTotal: document.getElementById("grandTotal"),
  paymentModes: document.getElementById("paymentModes"),
  completeBillBtn: document.getElementById("completeBillBtn"),
  clearOrderBtn: document.getElementById("clearOrderBtn"),
  pendingList: document.getElementById("pendingList"),
  preparingList: document.getElementById("preparingList"),
  readyList: document.getElementById("readyList"),
  todaySales: document.getElementById("todaySales"),
  todayOrders: document.getElementById("todayOrders"),
  screenDate: document.getElementById("screenDate"),
  screenTime: document.getElementById("screenTime"),
  cashTotal: document.getElementById("cashTotal"),
  upiTotal: document.getElementById("upiTotal"),
  cardTotal: document.getElementById("cardTotal"),
  topItem: document.getElementById("topItem"),
  reportDate: document.getElementById("reportDate"),
  billPreview: document.getElementById("billPreview"),
  printLastBtn: document.getElementById("printLastBtn"),
  exportBtn: document.getElementById("exportBtn"),
  resetDayBtn: document.getElementById("resetDayBtn"),
  flavourPicker: document.querySelector(".flavour-picker"),
  flavourOptions: document.getElementById("flavourOptions"),
  sweetFlavourButtons: document.getElementById("sweetFlavourButtons"),
  khataMithaFlavourButtons: document.getElementById("khataMithaFlavourButtons"),
  customFlavourInput: document.getElementById("customFlavourInput"),
  customFlavourBtn: document.getElementById("customFlavourBtn"),
  saveEditBtn: document.getElementById("saveEditBtn"),
  printNewTokenBtn: document.getElementById("printNewTokenBtn"),
  whatsappLastBtn: document.getElementById("whatsappLastBtn"),
  viewTabs: document.querySelector(".view-tabs"),
  serverWarning: document.getElementById("serverWarning")
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function fallbackData() {
  return { date: todayKey(), nextToken: 1, nextBill: 1, bills: [], history: {} };
}

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    ...options
  });
  if (!response.ok) throw new Error(`Server error ${response.status}`);
  return response.json();
}

async function loadData() {
  try {
    if (location.protocol !== "file:") return await apiRequest("/api/data");
    const fallback = fallbackData();
    const saved = JSON.parse(localStorage.getItem("aaradhnaBilling"));
    if (!saved) return fallback;
    saved.history = saved.history || {};
    if (saved.date !== todayKey()) {
      const history = { ...saved.history };
      if (saved.bills?.length) history[saved.date] = saved.bills;
      return { ...fallback, nextBill: saved.nextBill || 1, history };
    }
    return { ...fallback, ...saved };
  } catch {
    return fallbackData();
  }
}

async function loadMenu() {
  try {
    if (location.protocol !== "file:") {
      menu = await apiRequest("/api/menu");
    } else {
      menu = [...defaultMenu];
    }
  } catch {
    menu = [...defaultMenu];
  }
}

async function loadFlavours() {
  try {
    if (location.protocol !== "file:") {
      flavours = await apiRequest("/api/flavours");
    }
  } catch {
    // Keep default flavours if the server is unavailable.
  }
}

async function refreshData() {
  state.data = await loadData();
  renderAll();
}

async function syncSharedData() {
  if (location.protocol === "file:") return;
  try {
    state.data = await loadData();
    renderTokens();
    renderReport();
    if (!cartItems().length && !state.editingBillId) renderCart();
  } catch (error) {
    console.warn(error);
  }
}

async function saveData() {
  if (location.protocol === "file:") {
    localStorage.setItem("aaradhnaBilling", JSON.stringify(state.data));
    return state.data;
  }
  state.data = await apiRequest("/api/data", {
    method: "PUT",
    body: JSON.stringify(state.data)
  });
  return state.data;
}

function formatToken(number) {
  return String(number).padStart(3, "0");
}

function formatBill(number) {
  return `AID-${todayKey()}-${String(number).padStart(4, "0")}`;
}

function cartItems() {
  return Object.values(state.cart);
}

function subtotal() {
  return cartItems().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function discount() {
  return Math.max(0, Number(els.discountInput.value || 0));
}

function total() {
  return Math.max(0, subtotal() - discount());
}

function customerDetails() {
  return {
    name: els.customerNameInput.value.trim(),
    phone: normalizePhone(els.customerPhoneInput.value)
  };
}

function normalizePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

function renderCategories() {
  const categories = ["All", ...new Set(menu.map((item) => item.category))];
  els.categoryTabs.innerHTML = categories
    .map((category) => {
      const active = category === state.activeCategory ? " active" : "";
      return `<button class="category-tab${active}" type="button" data-category="${category}">${category}</button>`;
    })
    .join("");
}

function renderFlavours() {
  const sweet = Array.isArray(flavours.sweet) ? flavours.sweet : [];
  const khataMitha = Array.isArray(flavours.khataMitha) ? flavours.khataMitha : [];
  const all = [...sweet, ...khataMitha];
  els.flavourOptions.innerHTML = all.map((flavour) => `<option value="${escapeAttr(flavour)}">`).join("");
  els.sweetFlavourButtons.innerHTML = sweet
    .map((flavour) => `<button type="button" data-flavour="${escapeAttr(flavour)}">${escapeHtml(flavour)}</button>`)
    .join("");
  els.khataMithaFlavourButtons.innerHTML = khataMitha
    .map((flavour) => `<button type="button" data-flavour="${escapeAttr(flavour)}">${escapeHtml(flavour)}</button>`)
    .join("");
}

function renderItems() {
  const query = els.searchInput.value.trim().toLowerCase();
  const filtered = menu.filter((item) => {
    const categoryMatch = state.activeCategory === "All" || item.category === state.activeCategory;
    const queryMatch = !query || item.name.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });

  els.itemGrid.innerHTML = filtered
    .map(
      (item) => `
        <button class="item-card" type="button" data-item="${item.id}">
          <strong>${item.name}</strong>
          <span>${money.format(item.price)}</span>
        </button>
      `
    )
    .join("");
}

function renderCart() {
  const items = cartItems();
  if (!items.length) {
    els.cartList.innerHTML = `<div class="empty-state">Select items from the menu to start a bill.</div>`;
  } else {
    els.cartList.innerHTML = items
      .map(
        (item) => `
          <article class="cart-row">
            <div>
              <strong>${item.name}</strong>
              <p>${money.format(item.price)} x ${item.qty} = ${money.format(item.price * item.qty)}</p>
            </div>
            <div class="qty-controls">
              <button class="qty-button" type="button" data-dec="${item.id}">-</button>
              <strong>${item.qty}</strong>
              <button class="qty-button" type="button" data-inc="${item.id}">+</button>
              <button class="qty-button delete-line" type="button" data-remove="${item.id}">x</button>
            </div>
            <div class="cart-notes">
              <input type="text" list="flavourOptions" placeholder="Flavours e.g. Kala Khatta + Mango" value="${escapeAttr(item.flavours || "")}" data-note="${item.id}" data-field="flavours">
              <input type="text" list="instructionOptions" placeholder="Instructions e.g. Half-half mix" value="${escapeAttr(item.instructions || "")}" data-note="${item.id}" data-field="instructions">
            </div>
          </article>
        `
      )
      .join("");
  }

  els.subtotalAmount.textContent = money.format(subtotal());
  els.grandTotal.textContent = money.format(total());
  const editing = state.editingBillId ? state.data.bills.find((bill) => bill.id === state.editingBillId) : null;
  els.billPreview.textContent = editing
    ? `Editing token ${editing.token} | ${editing.paymentMode}`
    : items.length
    ? `Next token ${formatToken(state.data.nextToken)} | ${state.paymentMode}`
    : "Bill will be created after payment";
  els.completeBillBtn.hidden = Boolean(editing);
  els.saveEditBtn.hidden = !editing;
  els.printNewTokenBtn.hidden = !state.lastBill;
  els.whatsappLastBtn.hidden = !state.lastBill;
}

function renderTokens() {
  const openBills = state.data.bills.filter((bill) => bill.status !== "Delivered" && bill.status !== "Cancelled");
  const pending = openBills.filter((bill) => bill.status === "Pending");
  const preparing = openBills.filter((bill) => bill.status === "Preparing");
  const ready = openBills.filter((bill) => bill.status === "Ready");
  els.pendingList.innerHTML = tokenCards(pending, "Preparing");
  els.preparingList.innerHTML = tokenCards(preparing, "Ready");
  els.readyList.innerHTML = tokenCards(ready, "Delivered");
}

function tokenCards(bills, nextStatus) {
  if (!bills.length) return `<div class="empty-state">No tokens here.</div>`;
  return bills
    .map(
      (bill) => `
        <article class="token-card">
          <header>
            <strong>${bill.token}</strong>
            <span class="ready-badge">${bill.status}</span>
          </header>
          <ul>${bill.items
            .map((item) => {
              const notes = [item.flavours, item.instructions].filter(Boolean).map(escapeHtml).join(" | ");
              return `<li>${item.qty} x ${item.name}${notes ? `<br><small>${notes}</small>` : ""}</li>`;
            })
            .join("")}</ul>
          <footer>
            <button class="status-button" type="button" data-status="${bill.id}" data-next="${nextStatus}">${nextStatus}</button>
            <button class="status-button" type="button" data-print="${bill.id}">Print</button>
            <button class="status-button" type="button" data-whatsapp="${bill.id}">WhatsApp</button>
            <button class="status-button" type="button" data-edit="${bill.id}">Edit</button>
            <button class="status-button danger" type="button" data-cancel="${bill.id}">Cancel</button>
          </footer>
        </article>
      `
    )
    .join("");
}

function renderReport() {
  const paidBills = state.data.bills.filter((bill) => bill.status !== "Cancelled");
  const sales = paidBills.reduce((sum, bill) => sum + bill.total, 0);
  const paymentTotals = paidBills.reduce(
    (acc, bill) => {
      acc[bill.paymentMode] += bill.total;
      return acc;
    },
    { Cash: 0, UPI: 0, Card: 0 }
  );
  const itemCounts = {};
  paidBills.forEach((bill) => {
    bill.items.forEach((item) => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + item.qty;
    });
  });
  const top = Object.entries(itemCounts).sort((a, b) => b[1] - a[1])[0];

  els.todaySales.textContent = money.format(sales);
  els.todayOrders.textContent = paidBills.length;
  els.cashTotal.textContent = money.format(paymentTotals.Cash);
  els.upiTotal.textContent = money.format(paymentTotals.UPI);
  els.cardTotal.textContent = money.format(paymentTotals.Card);
  els.topItem.textContent = top ? `${top[0]} (${top[1]})` : "-";
  els.reportDate.textContent = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function renderClock() {
  const now = new Date();
  els.screenDate.textContent = now.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  els.screenTime.textContent = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function switchView(view) {
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.viewPanel === view);
  });
  document.querySelectorAll("[data-view]").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === view);
  });
}

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderAll() {
  renderCategories();
  renderFlavours();
  renderItems();
  renderCart();
  renderTokens();
  renderReport();
}

function addItem(id) {
  const item = menu.find((entry) => entry.id === id);
  if (!item) return;
  const lineId = `${id}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  state.cart[lineId] = { ...item, id: lineId, menuId: item.id, qty: 1, flavours: "", instructions: "" };
  renderCart();
}

function changeQty(id, delta) {
  if (!state.cart[id]) return;
  state.cart[id].qty += delta;
  if (state.cart[id].qty <= 0) delete state.cart[id];
  renderAll();
}

function removeLine(id) {
  delete state.cart[id];
  renderAll();
}

function latestCartLineId() {
  return Object.keys(state.cart).at(-1);
}

function addFlavourToLatest(flavour) {
  const id = latestCartLineId();
  if (!id) return;
  const item = state.cart[id];
  item.flavours = item.flavours ? `${item.flavours} + ${flavour}` : flavour;
  renderCart();
}

async function completeBill() {
  try {
    const items = cartItems().map((item) => ({ ...item }));
    if (!items.length) {
      alert("Please add items to the cart first");
      return;
    }
    const customer = customerDetails();
    const draft = {
      customerName: customer.name,
      customerPhone: customer.phone,
      items,
      subtotal: subtotal(),
      discount: discount(),
      total: total(),
      paymentMode: state.paymentMode
    };

    let bill;
    if (location.protocol === "file:") {
      bill = {
        id: crypto.randomUUID(),
        billNo: formatBill(state.data.nextBill),
        token: formatToken(state.data.nextToken),
        createdAt: new Date().toISOString(),
        ...draft,
        status: "Pending"
      };
      state.data.bills.push(bill);
      state.data.nextBill += 1;
      state.data.nextToken += 1;
      await saveData();
    } else {
      const result = await apiRequest("/api/bills", {
        method: "POST",
        body: JSON.stringify(draft)
      });
      bill = result.bill;
      state.data = result.data;
    }

    state.cart = {};
    els.discountInput.value = 0;
    els.customerNameInput.value = "";
    els.customerPhoneInput.value = "";
    state.lastBill = bill;
    renderAll();
    console.log("Bill created successfully:", bill);
  } catch (error) {
    console.error("Error creating bill:", error);
    alert("Error: " + error.message);
  }
}

function editBill(id) {
  const bill = state.data.bills.find((entry) => entry.id === id);
  if (!bill || bill.status === "Cancelled") return;
  state.editingBillId = id;
  state.paymentMode = bill.paymentMode;
  state.cart = {};
  els.customerNameInput.value = bill.customerName || "";
  els.customerPhoneInput.value = bill.customerPhone || "";
  bill.items.forEach((item) => {
    const lineId = `${item.menuId || item.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    state.cart[lineId] = { ...item, id: lineId, menuId: item.menuId || item.id };
  });
  els.discountInput.value = bill.discount || 0;
  document.querySelectorAll(".pay-mode").forEach((mode) => {
    mode.classList.toggle("active", mode.dataset.mode === state.paymentMode);
  });
  renderAll();
}

async function saveEditedBill() {
  const bill = state.data.bills.find((entry) => entry.id === state.editingBillId);
  if (!bill) return;
  const items = cartItems().map((item) => ({ ...item }));
  if (!items.length) return;
  const customer = customerDetails();
  const patch = {
    items,
    subtotal: subtotal(),
    discount: discount(),
    total: total(),
    paymentMode: state.paymentMode,
    customerName: customer.name,
    customerPhone: customer.phone,
    editedAt: new Date().toISOString()
  };
  Object.assign(bill, patch);
  if (location.protocol === "file:") {
    await saveData();
  } else {
    const result = await apiRequest(`/api/bills/${bill.id}`, {
      method: "PATCH",
      body: JSON.stringify(patch)
    });
    state.data = result.data;
  }
  state.cart = {};
  state.editingBillId = null;
  els.discountInput.value = 0;
  els.customerNameInput.value = "";
  els.customerPhoneInput.value = "";
  state.lastBill = bill;
  renderAll();
}

async function cancelBill(id) {
  const bill = state.data.bills.find((entry) => entry.id === id);
  if (!bill || bill.status === "Cancelled") return;
  const reason = prompt(`Cancel token ${bill.token}? Enter reason:`);
  if (reason === null) return;
  const patch = {
    status: "Cancelled",
    cancelReason: reason.trim() || "No reason given",
    cancelledAt: new Date().toISOString()
  };
  Object.assign(bill, patch);
  if (state.editingBillId === id) {
    state.editingBillId = null;
    state.cart = {};
    els.discountInput.value = 0;
    els.customerNameInput.value = "";
    els.customerPhoneInput.value = "";
  }
  if (location.protocol === "file:") {
    await saveData();
  } else {
    const result = await apiRequest(`/api/bills/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch)
    });
    state.data = result.data;
  }
  renderAll();
}

function printBill(bill) {
  if (!bill) return;
  const existing = document.querySelector(".receipt");
  if (existing) existing.remove();
  const receipt = document.getElementById("printTemplate").content.cloneNode(true);
  receipt.getElementById("printToken").textContent = `Token ${bill.token}`;
  receipt.getElementById("printBill").textContent = `Bill: ${bill.billNo}`;
  receipt.getElementById("printDate").textContent = [
    new Date(bill.createdAt).toLocaleString("en-IN"),
    bill.customerName ? `Customer: ${bill.customerName}` : "",
    bill.customerPhone ? `Contact: ${bill.customerPhone}` : ""
  ]
    .filter(Boolean)
    .join(" | ");
  receipt.getElementById("printItems").innerHTML = bill.items
    .map((item) => {
      const notes = [item.flavours, item.instructions].filter(Boolean).map(escapeHtml).join(" | ");
      return `<p>${item.qty} x ${item.name} - ${money.format(item.price * item.qty)}${notes ? `<br>${notes}` : ""}</p>`;
    })
    .join("");
  receipt.getElementById("printTotal").textContent = `Total: ${money.format(bill.total)}`;
  receipt.getElementById("printPayment").textContent = `Payment: ${bill.paymentMode} | Paid`;
  document.body.appendChild(receipt);
  window.print();
}

function billMessage(bill) {
  const lines = [
    "Aaradhna Ice Dish & Gola",
    `Token: ${bill.token}`,
    `Bill: ${bill.billNo}`,
    bill.customerName ? `Customer: ${bill.customerName}` : "",
    "",
    "Items:",
    ...bill.items.map((item) => {
      const notes = [item.flavours, item.instructions].filter(Boolean).join(" | ");
      return `${item.qty} x ${item.name} - ${money.format(item.price * item.qty)}${notes ? ` (${notes})` : ""}`;
    }),
    "",
    `Subtotal: ${money.format(bill.subtotal)}`,
    bill.discount ? `Discount: ${money.format(bill.discount)}` : "",
    `Total: ${money.format(bill.total)}`,
    `Payment: ${bill.paymentMode} | Paid`,
    "",
    "Please collect your order when token is called. Thank you!"
  ];
  return lines.filter((line) => line !== "").join("\n");
}

async function sendWhatsAppBill(bill) {
  if (!bill) return;
  let phone = bill.customerPhone || "";
  if (!phone) {
    phone = normalizePhone(prompt("Enter customer WhatsApp number:") || "");
    if (!phone) return;
    bill.customerPhone = phone;
    if (location.protocol === "file:") {
      await saveData();
    } else {
      const result = await apiRequest(`/api/bills/${bill.id}`, {
        method: "PATCH",
        body: JSON.stringify({ customerPhone: phone })
      });
      state.data = result.data;
      bill = result.bill;
      renderAll();
    }
  }
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(billMessage(bill))}`;
  window.open(url, "_blank", "noopener");
}

async function updateStatus(id, status) {
  const bill = state.data.bills.find((entry) => entry.id === id);
  if (!bill) return;
  bill.status = status;
  if (location.protocol === "file:") {
    await saveData();
  } else {
    const result = await apiRequest(`/api/bills/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
    state.data = result.data;
  }
  renderAll();
}

function exportCsv() {
  const headers = ["Bill No", "Token", "Date", "Customer Name", "Contact Number", "Items", "Flavours", "Instructions", "Subtotal", "Discount", "Total", "Payment", "Status", "Cancel Reason"];
  const rows = state.data.bills.map((bill) => [
    bill.billNo,
    bill.token,
    new Date(bill.createdAt).toLocaleString("en-IN"),
    bill.customerName || "",
    bill.customerPhone || "",
    bill.items.map((item) => `${item.qty} x ${item.name}`).join("; "),
    bill.items.map((item) => item.flavours || "").filter(Boolean).join("; "),
    bill.items.map((item) => item.instructions || "").filter(Boolean).join("; "),
    bill.subtotal,
    bill.discount,
    bill.total,
    bill.paymentMode,
    bill.status,
    bill.cancelReason || ""
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `aaradhna-sales-${todayKey()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

async function closeDay() {
  const ok = confirm("Close today's billing and start a fresh token sequence?");
  if (!ok) return;
  if (location.protocol === "file:") {
    if (state.data.bills.length) {
      state.data.history[state.data.date] = state.data.bills;
    }
    state.data = {
      date: todayKey(),
      nextToken: 1,
      nextBill: state.data.nextBill,
      bills: [],
      history: state.data.history
    };
    await saveData();
  } else {
    state.data = await apiRequest("/api/close-day", { method: "POST" });
  }
  state.cart = {};
  state.lastBill = null;
  renderAll();
}

els.categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.activeCategory = button.dataset.category;
  renderAll();
});

els.itemGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-item]");
  if (button) addItem(button.dataset.item);
});

els.cartList.addEventListener("click", (event) => {
  const inc = event.target.closest("[data-inc]");
  const dec = event.target.closest("[data-dec]");
  const remove = event.target.closest("[data-remove]");
  if (inc) changeQty(inc.dataset.inc, 1);
  if (dec) changeQty(dec.dataset.dec, -1);
  if (remove) removeLine(remove.dataset.remove);
});

els.cartList.addEventListener("input", (event) => {
  const input = event.target.closest("[data-note]");
  if (!input || !state.cart[input.dataset.note]) return;
  state.cart[input.dataset.note][input.dataset.field] = input.value.trim();
});

els.flavourPicker.addEventListener("click", (event) => {
  const button = event.target.closest("[data-flavour]");
  if (!button) return;
  addFlavourToLatest(button.dataset.flavour);
});

els.customFlavourBtn.addEventListener("click", () => {
  const flavour = els.customFlavourInput.value.trim();
  if (!flavour) return;
  addFlavourToLatest(flavour);
  els.customFlavourInput.value = "";
});

els.customFlavourInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  els.customFlavourBtn.click();
});

els.paymentModes.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  state.paymentMode = button.dataset.mode;
  document.querySelectorAll(".pay-mode").forEach((mode) => mode.classList.remove("active"));
  button.classList.add("active");
  renderCart();
});

document.addEventListener("click", (event) => {
  const statusButton = event.target.closest("[data-status]");
  const printButton = event.target.closest("[data-print]");
  const whatsappButton = event.target.closest("[data-whatsapp]");
  const editButton = event.target.closest("[data-edit]");
  const cancelButton = event.target.closest("[data-cancel]");
  if (statusButton) updateStatus(statusButton.dataset.status, statusButton.dataset.next);
  if (printButton) printBill(state.data.bills.find((bill) => bill.id === printButton.dataset.print));
  if (whatsappButton) sendWhatsAppBill(state.data.bills.find((bill) => bill.id === whatsappButton.dataset.whatsapp));
  if (editButton) editBill(editButton.dataset.edit);
  if (cancelButton) cancelBill(cancelButton.dataset.cancel);
});

els.searchInput.addEventListener("input", renderItems);
els.discountInput.addEventListener("input", renderCart);
els.completeBillBtn.addEventListener("click", completeBill);
els.saveEditBtn.addEventListener("click", saveEditedBill);
els.printNewTokenBtn.addEventListener("click", () => printBill(state.lastBill || state.data.bills.at(-1)));
els.whatsappLastBtn.addEventListener("click", () => sendWhatsAppBill(state.lastBill || state.data.bills.at(-1)));
els.clearOrderBtn.addEventListener("click", () => {
  state.cart = {};
  state.editingBillId = null;
  els.discountInput.value = 0;
  els.customerNameInput.value = "";
  els.customerPhoneInput.value = "";
  renderCart();
});
els.printLastBtn.addEventListener("click", () => printBill(state.lastBill || state.data.bills.at(-1)));
els.exportBtn.addEventListener("click", exportCsv);
els.resetDayBtn.addEventListener("click", closeDay);
els.viewTabs.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-view]");
  if (!tab) return;
  switchView(tab.dataset.view);
});

async function init() {
  if (location.protocol === "file:" && els.serverWarning) {
    els.serverWarning.hidden = false;
  }
  await loadMenu();
  await loadFlavours();
  await refreshData();
  renderClock();
  setInterval(renderClock, 1000);
  setInterval(syncSharedData, 2000);
}

init();
