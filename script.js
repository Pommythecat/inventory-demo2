const API_URL = "http://localhost:3001/api/items";

// Fetch items from backend and render them
async function loadItems() {
  try {
    const res = await fetch(API_URL);
    const items = await res.json();

    renderItems(items);
  } catch (error) {
    console.error("Failed to load items:", error);
  }
}

// Render list of items with barcode and delete button
function renderItems(items) {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = ""; // Clear previous

  items.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.className = "item";

    itemElement.innerHTML = `
      <p><strong>${item.name}</strong> (${item.quantity}) – ${item.location}</p>
      <svg id="barcode-${item.id}"></svg>
      <button onclick="deleteItem(${item.id})">🗑️ Delete</button>
    `;

    itemList.appendChild(itemElement);

    JsBarcode(`#barcode-${item.id}`, String(item.id), {
      format: "CODE128",
      width: 2,
      height: 50,
      displayValue: true,
    });
  });
}

// Handle form submission to add new item
document.getElementById("itemForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const quantity = parseInt(document.getElementById("quantity").value);
  const location = document.getElementById("location").value.trim();

  if (!name || !quantity || !location) {
    alert("Please fill in all fields");
    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quantity, location }),
    });

    e.target.reset();
    loadItems(); // Refresh the list
  } catch (error) {
    console.error("Failed to add item:", error);
  }
});

// Delete an item by ID
async function deleteItem(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadItems(); // Refresh list
  } catch (error) {
    console.error("Failed to delete item:", error);
  }
}

// Initial load
loadItems();
