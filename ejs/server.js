const express = require("express");
const app = express();
const { Contenedor } = require("./contenedor");
let contenedor = new Contenedor("products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views/");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("productForm.ejs");
});
app.post("/products", async (req, res) => {
  const { body } = req;

  await contenedor.saveNewProduct(body);

  res.redirect("/");
});
app.get("/products", async (req, res) => {
  const products = await contenedor.getAll();
  res.render("productList.ejs", { products });
});

const PORT = 8081;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
