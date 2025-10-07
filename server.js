const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let items = [];
let currentId = 1;

// GET all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// POST new item
app.post("/api/items", (req, res) => {
  const { name, quantity, location } = req.body;
  if (!name || !quantity || !location) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const newItem = { id: currentId++, name, quantity, location };
  items.push(newItem);
  res.status(201).json(newItem);
});

// DELETE item by id
app.delete("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  items.splice(index, 1);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
