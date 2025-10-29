const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Product = sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  available_filaments: {
    type: DataTypes.JSON, // each filament has { color, image }
    allowNull: false
  }
});

module.exports = Product;
