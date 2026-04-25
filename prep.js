const prepGrid = document.getElementById("prepGrid");
const clock = document.getElementById("clock");
const serverWarning = document.getElementById("serverWarning");
const statusOrder = ["Pending", "Preparing", "Ready"];

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

async function patchBill(id, patch) {
  if (location.protocol === "file:") {
    const data = await loadData();
    const bill = (data.bills || []).find((entry) => entry.id === id);
    if (bill) Object.assign(bill, patch);
    localStorage.setItem("aaradhnaBilling", JSON.stringify(data));
    return data;
  }
  const response = await fetch(`/api/bills/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch)
  });
  if (!response.ok) throw new Error(`Server error ${response.status}`);
  return response.json();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function nextStatus(status) {
  if (status === "Pending") return "Preparing";
  if (status === "Preparing") return "Ready";
  return "Ready";
}

function orderCard(bill) {
  const statusClass = String(bill.status || "Pending").toLowerCase();
  const time = new Date(bill.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
  return `
    <button class="prep-card ${statusClass}" type="button" data-id="${escapeHtml(bill.id)}" data-status="${escapeHtml(bill.status || "Pending")}">
      <header>
        <div class="token">${escapeHtml(bill.token)}</div>
        <div>
          <div class="status">${escapeHtml(bill.status || "Pending")}</div>
          <div class="time">${time}</div>
        </div>
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
    </button>
  `;
}

async function render() {
  const data = await loadData();
  const orders = (data.bills || [])
    .filter((bill) => statusOrder.includes(bill.status))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  prepGrid.innerHTML = orders.length
    ? orders.map(orderCard).join("")
    : `<div class="empty">No active orders</div>`;
}

function renderClock() {
  clock.textContent = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

prepGrid.addEventListener("click", async (event) => {
  const card = event.target.closest("[data-id]");
  if (!card) return;
  const status = nextStatus(card.dataset.status);
  await patchBill(card.dataset.id, { status });
  await render();
});

if (location.protocol === "file:" && serverWarning) {
  serverWarning.hidden = false;
}

render();
renderClock();
setInterval(render, 2000);
setInterval(renderClock, 1000);
