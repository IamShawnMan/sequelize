import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Product } from "./product.model.js";

export const Category = sequelize.define(
  "category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
);

Category.hasMany(Product, { foreignKey: "categoryId", as: "product" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
