const menuEditor = document.getElementById("menuEditor");
const addItemBtn = document.getElementById("addItemBtn");
const saveMenuBtn = document.getElementById("saveMenuBtn");
const saveStatus = document.getElementById("saveStatus");
const saveFlavoursBtn = document.getElementById("saveFlavoursBtn");
const flavourSaveStatus = document.getElementById("flavourSaveStatus");
const sweetInput = document.getElementById("sweetInput");
const khataMithaInput = document.getElementById("khataMithaInput");
const addSweetBtn = document.getElementById("addSweetBtn");
const addKhataMithaBtn = document.getElementById("addKhataMithaBtn");
const sweetList = document.getElementById("sweetList");
const khataMithaList = document.getElementById("khataMithaList");
let menu = [];
let flavours = { sweet: [], khataMitha: [] };

async function loadMenu() {
  const response = await fetch("/api/menu", { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load menu");
  menu = await response.json();
}

async function loadFlavours() {
  const response = await fetch("/api/flavours", { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load flavours");
  flavours = await response.json();
}

function slug(value) {
  return String(value || crypto.randomUUID()).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function render() {
  menuEditor.innerHTML = menu.map((item, index) => `
    <article class="menu-row">
      <input value="${escapeAttr(item.name)}" placeholder="Item name" data-index="${index}" data-field="name">
      <input value="${escapeAttr(item.category)}" placeholder="Category" data-index="${index}" data-field="category">
      <input type="number" min="0" step="1" value="${Number(item.price || 0)}" placeholder="Price" data-index="${index}" data-field="price">
      <button type="button" data-delete="${index}">Delete</button>
    </article>
  `).join("");
}

function renderFlavours() {
  sweetList.innerHTML = flavourChips("sweet");
  khataMithaList.innerHTML = flavourChips("khataMitha");
}

function flavourChips(type) {
  const list = Array.isArray(flavours[type]) ? flavours[type] : [];
  return list.length
    ? list.map((flavour, index) => `
      <span class="flavour-chip">
        ${escapeAttr(flavour)}
        <button type="button" data-flavour-delete="${type}" data-index="${index}">x</button>
      </span>
    `).join("")
    : `<p class="empty">No flavours yet</p>`;
}

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

async function saveMenu() {
  const clean = menu.map((item) => ({
    id: item.id || slug(item.name),
    name: item.name.trim(),
    category: item.category.trim() || "Menu",
    price: Number(item.price || 0)
  })).filter((item) => item.name);
  const response = await fetch("/api/menu", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clean)
  });
  if (!response.ok) throw new Error("Could not save menu");
  menu = await response.json();
  saveStatus.textContent = "Saved";
  render();
  setTimeout(() => (saveStatus.textContent = ""), 1800);
}

async function saveFlavours() {
  flavours = {
    sweet: cleanFlavourList(flavours.sweet),
    khataMitha: cleanFlavourList(flavours.khataMitha)
  };
  const response = await fetch("/api/flavours", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flavours)
  });
  if (!response.ok) throw new Error("Could not save flavours");
  flavours = await response.json();
  flavourSaveStatus.textContent = "Saved";
  renderFlavours();
  setTimeout(() => (flavourSaveStatus.textContent = ""), 1800);
}

function cleanFlavourList(list) {
  return [...new Set((Array.isArray(list) ? list : []).map((item) => String(item || "").trim()).filter(Boolean))];
}

function addFlavour(type, input) {
  const flavour = input.value.trim();
  if (!flavour) return;
  flavours[type] = cleanFlavourList([...(flavours[type] || []), flavour]);
  input.value = "";
  renderFlavours();
}

menuEditor.addEventListener("input", (event) => {
  const input = event.target.closest("[data-index]");
  if (!input) return;
  const item = menu[Number(input.dataset.index)];
  item[input.dataset.field] = input.dataset.field === "price" ? Number(input.value || 0) : input.value;
});

menuEditor.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete]");
  if (!button) return;
  menu.splice(Number(button.dataset.delete), 1);
  render();
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-flavour-delete]");
  if (!button) return;
  const type = button.dataset.flavourDelete;
  flavours[type].splice(Number(button.dataset.index), 1);
  renderFlavours();
});

addItemBtn.addEventListener("click", () => {
  menu.push({ id: crypto.randomUUID(), name: "", category: "Ice Gola", price: 0 });
  render();
});

saveMenuBtn.addEventListener("click", () => {
  saveMenu().catch((error) => {
    saveStatus.textContent = error.message;
  });
});

addSweetBtn.addEventListener("click", () => addFlavour("sweet", sweetInput));
addKhataMithaBtn.addEventListener("click", () => addFlavour("khataMitha", khataMithaInput));

sweetInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  addSweetBtn.click();
});

khataMithaInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  addKhataMithaBtn.click();
});

saveFlavoursBtn.addEventListener("click", () => {
  saveFlavours().catch((error) => {
    flavourSaveStatus.textContent = error.message;
  });
});

Promise.all([loadMenu(), loadFlavours()]).then(() => {
  render();
  renderFlavours();
});
