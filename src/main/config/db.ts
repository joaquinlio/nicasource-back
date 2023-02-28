import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("nicasource", "postgres", "125678", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});
