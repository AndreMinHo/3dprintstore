const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Product = sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  available_filaments: {
    type: DataTypes.JSON, // stores your structured array of filament options
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Product;

