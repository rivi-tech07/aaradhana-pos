const preparingList = document.getElementById("preparingList");
const readyList = document.getElementById("readyList");
const clock = document.getElementById("clock");
const serverWarning = document.getElementById("serverWarning");

async function loadData() {
  try {
    if (location.protocol !== "file:") {
      const response = await fetch("/api/data", { cache: "no-store" });
      if (!response.ok) throw new Error(`Server error ${response.status}`);
      return await response.json();
    }
    return JSON.parse(localStorage.getItem("aaradhnaBilling")) || { bills: [] };
  } catch {
    return { bills: [] };
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function orderCard(bill) {
  const time = new Date(bill.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
  return `
    <article class="order-card">
      <header>
        <div class="token">${escapeHtml(bill.token)}</div>
        <div class="time">${time}</div>
      </header>
      ${bill.customerName ? `<div class="customer">${escapeHtml(bill.customerName)}</div>` : ""}
      <ul>
        ${bill.items
          .map((item) => {
            const notes = [item.flavours, item.instructions].filter(Boolean).map(escapeHtml).join(" | ");
            return `<li>${item.qty} x ${escapeHtml(item.name)}${notes ? `<small>${notes}</small>` : ""}</li>`;
          })
          .join("")}
      </ul>
    </article>
  `;
}

function renderList(element, bills, text) {
  element.innerHTML = bills.length
    ? bills.map(orderCard).join("")
    : `<div class="empty">${text}</div>`;
}

async function render() {
  const data = await loadData();
  const openBills = (data.bills || []).filter((bill) => bill.status !== "Delivered" && bill.status !== "Cancelled");
  const newestFirst = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
  renderList(
    preparingList,
    openBills.filter((bill) => bill.status === "Preparing").sort(newestFirst),
    "No preparing orders"
  );
  renderList(
    readyList,
    openBills.filter((bill) => bill.status === "Ready").sort(newestFirst),
    "No ready orders"
  );
}

function renderClock() {
  clock.textContent = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

if (location.protocol === "file:" && serverWarning) {
  serverWarning.hidden = false;
}

render();
renderClock();
setInterval(render, 2000);
setInterval(renderClock, 1000);
