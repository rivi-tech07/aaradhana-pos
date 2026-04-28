const prepGrid = document.getElementById("prepGrid");
const clock = document.getElementById("clock");
const statusOrder = ["Pending", "Preparing", "Ready"];

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
  const createdAt = bill.createdAt ? new Date(bill.createdAt) : null;
  const time = createdAt && !isNaN(createdAt)
    ? createdAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  return `
    <button class="prep-card ${statusClass}" type="button" data-id="${escapeHtml(bill.id)}" data-status="${escapeHtml(bill.status || "Pending")}">
      <header>
        <div class="token">${escapeHtml(bill.token || "—")}</div>
        <div>
          <div class="status">${escapeHtml(bill.status || "Pending")}</div>
          <div class="time">${escapeHtml(time)}</div>
        </div>
      </header>
      ${bill.customerName ? `<div class="customer">${escapeHtml(bill.customerName)}</div>` : ""}
      <ul>
        ${(bill.items || [])
          .map((item) => {
            const notes = [item.flavours, item.instructions]
              .filter(Boolean)
              .map(escapeHtml)
              .join(" | ");
            return `<li>${item.qty} x ${escapeHtml(item.name)}${notes ? `<small>${notes}</small>` : ""}</li>`;
          })
          .join("")}
      </ul>
    </button>
  `;
}

function render(bills) {
  const orders = bills
    .filter((bill) => statusOrder.includes(bill.status))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  prepGrid.innerHTML = orders.length
    ? orders.map(orderCard).join("")
    : `<div class="empty">No active orders</div>`;
}

function renderClock() {
  clock.textContent = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Real-time listener: screen updates instantly when new orders arrive or statuses change
db.ref("aaradhana/bills").on("value", (snap) => {
  render(Object.values(snap.val() || {}));
});

// Tapping a card advances its status; only the status field is updated in Firebase
prepGrid.addEventListener("click", async (event) => {
  const card = event.target.closest("[data-id]");
  if (!card) return;
  const status = nextStatus(card.dataset.status);
  await db.ref(`aaradhana/bills/${card.dataset.id}/status`).set(status);
});

renderClock();
setInterval(renderClock, 1000);
