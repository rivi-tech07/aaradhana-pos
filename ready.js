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
        ${bill.items
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

function renderClock() {
  clock.textContent = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

db.ref("aaradhana/bills").on("value", (snap) => {
  const bills = Object.values(snap.val() || {});
  const ready = bills
    .filter((b) => b.status === "Ready")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  readyList.innerHTML = ready.length
    ? ready.map(orderCard).join("")
    : `<div class="empty">No orders ready yet</div>`;
});

renderClock();
setInterval(renderClock, 1000);
