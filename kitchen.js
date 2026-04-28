const preparingList = document.getElementById("preparingList");
const readyList = document.getElementById("readyList");
const clock = document.getElementById("clock");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function orderCard(bill) {
  const time = new Date(bill.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `
    <article class="order-card">
      <header>
        <div class="token">${escapeHtml(bill.token)}</div>
        <div class="time">${time}</div>
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
    </article>
  `;
}

function renderList(element, bills, text) {
  element.innerHTML = bills.length
    ? bills.map(orderCard).join("")
    : `<div class="empty">${text}</div>`;
}

function render(bills) {
  const openBills = bills.filter(
    (bill) => bill.status !== "Delivered" && bill.status !== "Cancelled",
  );
  const newestFirst = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
  renderList(
    preparingList,
    openBills.filter((bill) => bill.status === "Preparing").sort(newestFirst),
    "No preparing orders",
  );
  renderList(
    readyList,
    openBills.filter((bill) => bill.status === "Ready").sort(newestFirst),
    "No ready orders",
  );
}

function renderClock() {
  clock.textContent = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Real-time listener: screen updates instantly when any order status changes
db.ref("aaradhana/bills").on("value", (snap) => {
  render(Object.values(snap.val() || {}));
});

renderClock();
setInterval(renderClock, 1000);
