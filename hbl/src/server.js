const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

const { Contenedor } = require("./contenedor");
let contenedor = new Contenedor("products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./src/views");
app.set("view engine", "hbs");

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    // eslint-disable-next-line no-undef
    layoutsDir: __dirname + "/views/layouts",
    // eslint-disable-next-line no-undef
    partialsDir: __dirname + "/views/partials",
  })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("ProductForm");
});
app.post("/products", async (req, res) => {
  const { body } = req;

  await contenedor.saveNewProduct(body);

  res.redirect("/");
});
app.get("/products", async (req, res) => {
  const products = await contenedor.getAll();
  res.render("productsList", {
    products,
  });
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
