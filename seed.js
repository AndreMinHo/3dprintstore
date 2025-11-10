const sequelize = require("./sequelize");
const Product = require("./models/Product");

const products = [
  {
    title: "Ducky",
    description: "A 1:1 Ducky figure.",
    price: 10,
    available_filaments: [
      { filament: "PLA Color", images: ["ducky_color_1.png", "ducky_color_2.png"] },
      { filament: "PLA Matte", images: ["ducky_matte_1.png", "ducky_matte_2.png"] },
      { filament: "PET", images: ["ducky_pet_1.png", "ducky_pet_2.png"] }
    ]
  },
  {
    title: "A KAMO keychain.",
    description: "A stylish keychain.",
    price: 5,
    available_filaments: [
      { filament: "PLA Color", images: ["kamo_color_1.png", "kamo_color_2.png"] },
      { filament: "PLA Matte", images: ["kamo_matte_1.png", "kamo_matte_2.png"] },
      { filament: "PET", images: ["kamo_pet_1.png", "kamo_pet_2.png"] }
    ]
  },
  {
    title: "C Coin",
    description: "A coin that can be used in board games.",
    price: 1,
    available_filaments: [
      { filament: "PLA Color", images: ["coin_color_1.png", "coin_color_2.png"] },
      { filament: "PLA Matte", images: ["coin_matte_1.png", "coin_matte_2.png"] },
      { filament: "PET", images: ["coin_pet_1.png", "coin_pet_2.png"] }
    ]
  }
];

async function seed() {
  await sequelize.sync({ force: true }); // wipes and recreates tables
  console.log("Database synced.");

  await Product.bulkCreate(products);
  console.log("Products seeded successfully.");

  process.exit();
}

seed().catch((err) => {
  console.error("Error seeding:", err);
});
