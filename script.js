const API_URL = "http://localhost:3001/api/items"; // Later, we will change this to your live URL

async function loadItems() {
  items.forEach(item => {
  const li = document.createElement("li");
  li.innerHTML = `
    ${item.name} - ${item.quantity} at ${item.location}
    <br>
    <svg id="barcode${item.id}"></svg>
  `;
  document.getElementById("itemList").appendChild(li);
  
  JsBarcode(`#barcode${item.id}`, item.id.toString(), {
    format: "CODE128",
    width: 2,
    height: 40,
    displayValue: false
  });
});


document.getElementById("itemForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const quantity = document.getElementById("quantity").value;
  const location = document.getElementById("location").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, quantity, location }),
  });

  e.target.reset();
  loadItems();
});

loadItems();
function renderItems(items) {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  items.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.className = "item";

    itemElement.innerHTML = `
      <p><strong>${item.name}</strong> (${item.quantity}) – ${item.location}</p>
      <svg id="barcode-${item.id}"></svg>
      <button onclick="deleteItem(${item.id})">🗑️ Delete</button>
    `;

    itemList.appendChild(itemElement);

    // Generate barcode (based on item ID or name)
    JsBarcode(`#barcode-${item.id}`, String(item.id), {
      format: "CODE128",
      width: 2,
      height: 50,
      displayValue: true,
    });
  });
}
