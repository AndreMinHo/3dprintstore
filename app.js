const express = require("express");
const app = express();

const session = require("express-session");

const sequelize = require("./sequelize");
const Product = require("./models/Product");
const User = require("./models/User");

// Set view engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));

// ===== Add body-parsing middleware here =====
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // optional, for JSON requests

// Configure sessions
app.use(session({
  secret: "your_secret_key_here", // Placeholder, for demo purposes only
  resave: false,
  saveUninitialized: false
}));

// Make `user` available in all templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// -------------------- ROUTES --------------------

// Home
app.get("/", (req, res) => {
  res.render("index", { title: "3D Print Store" });
});

// Login
app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

// Handle login form
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render("login", { title: "Login", error: "Please enter both username and password." });
  }

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.render("login", { title: "Login", error: "User not found." });
  }

  if (user.password !== password) {
    return res.render("login", { title: "Login", error: "Incorrect password." });
  }

  // Set session
  req.session.user = {
    id: user.id,
    username: user.username,
    balance: user.balance
  };

  res.redirect("/account");
});



// Sign Up page
app.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

// Handle sign-up form
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send("Please enter both username and password.");
  }

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.send("Username already taken.");
  }

  const newUser = await User.create({ username, password });

  // Set session
  req.session.user = {
    id: newUser.id,
    username: newUser.username,
    balance: newUser.balance
  };

  // Redirect to account page
  res.redirect("/account");
});

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send("Error logging out.");
    }
    res.redirect("/"); // redirect to home after logout
  });
});

// Product list
app.get("/products", async (req, res) => {
  const products = await Product.findAll();
  res.render("products", { title: "Products", products });
});

// Product detail
app.get("/products/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).send("Product not found");
  res.render("product-detail", { title: product.title, product });
});

// Account page — now shows logged-in user if any
app.get("/account", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("account", { title: "My Account", user: req.session.user });
});

// ------------------ DATABASE & SERVER ------------------

sequelize.sync().then(() => {
  console.log("Database ready");

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
