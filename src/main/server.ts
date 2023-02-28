import { seedDatabase } from "../utils/seeders/seed";
import app from "./config/app";
import { sequelize } from "./config/db";
import env from "./config/env";

async function main() {
  try {
    await sequelize.sync({ force: true });
    console.log("Connection to database has been established successfully.");

    if (env.nodeEnv === "development") {
      await seedDatabase(sequelize);
    }

    app.listen(env.port, () =>
      console.log(`Server running at: http://localhost:${env.port}`)
    );
  } catch (error) {
    console.log(error);
  }
}

main();
