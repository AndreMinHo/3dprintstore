const sequelize = require("./sequelize");
const Product = require("./models/Product");
const products = [
  {
    title: "Mini Figure",
    description: "A cute miniature 3D print.",
    price: 25,
    available_filaments: [
      { color: "Red", image: "mini-red.png" },
      { color: "Blue", image: "mini-blue.png" }
    ]
  },
  {
    title: "Phone Stand",
    description: "Perfect stand for your phone or tablet.",
    price: 15,
    available_filaments: [
      { color: "Black", image: "stand-black.png" },
      { color: "White", image: "stand-white.png" }
    ]
  },
  {
    title: "Custom Keychain",
    description: "Personalized keychain with your name!",
    price: 10,
    available_filaments: [
      { color: "Green", image: "keychain-green.png" },
      { color: "Yellow", image: "keychain-yellow.png" }
    ]
  }
];

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced");

    await Product.bulkCreate(products);
    console.log("Products seeded!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seed();
