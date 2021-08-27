const express = require('express');
const { Contenedor } = require("./contenedor");
let contenedor = new Contenedor("products.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./src/views/");
app.set("view engine", "pug");

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('productForm')
})
app.post("/products", async (req, res) => {
  const { body } = req;

  await contenedor.saveNewProduct(body);

  res.redirect("/");
});
app.get('/products', async (req, res) => {
  const products = await contenedor.getAll();
  res.render("productsList", { products })
})

const PORT = 3000

app.listen(PORT, console.log(`Server on port = ${PORT}`))