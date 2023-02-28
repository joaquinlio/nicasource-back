import { Sequelize } from "sequelize";
import { up } from "./createData";

export async function seedDatabase(sequelize: Sequelize) {
  try {
    await up(sequelize.getQueryInterface());
    console.log("Seeding completed");
  } catch (error) {
    console.error("Seeding failed", error);
  }
}
