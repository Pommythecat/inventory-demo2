const API_URL = "http://localhost:3001/api/items"; // Later, we will change this to your live URL

async function loadItems() {
  const res = await fetch(API_URL);
  const items = await res.json();
  const list = document.getElementById("itemList");
  list.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.quantity} at ${item.location}`;
    list.appendChild(li);
  });
}

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
