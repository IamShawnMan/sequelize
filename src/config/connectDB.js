import { sequelize } from "./db.js";

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false, logging: false });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error on connection database");
    console.log(error);
    process.exit(1);
  }
};
