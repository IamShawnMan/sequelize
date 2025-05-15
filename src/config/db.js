import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const vars = process.env;

export const sequelize = new Sequelize({
  host: vars.PG_HOST,
  port: vars.PG_PORT,
  database: vars.PG_DB,
  username: vars.PG_USER,
  password: vars.PG_PASS,
  dialect: vars.PG_DIALECT,
});
