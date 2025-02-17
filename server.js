const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "assets")));

const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
];

const users = [
  { id: 1, name: "Ahmad", age: 30 },
  { id: 2, name: "Noor", age: 25 },
  { id: 3, name: "Hasan", age: 40 },
];

app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send("Product not found");
  }
});

app.get("/users", (req, res) => {
  const age = req.query.age;
  let filteredUsers = users;
  if (age) {
    filteredUsers = users.filter((user) => user.age >= age);
  }
  res.send(filteredUsers);
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "assets", "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
