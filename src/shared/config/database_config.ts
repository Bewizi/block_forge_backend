import { Sequelize } from "sequelize";
import config from "./index";

const database = new Sequelize(
  config.database.name!,
  config.database.username!,
  config.database.password!,
  {
    host: config.database.host,
    dialect: "postgres",
    port: config.database.port || 5432,
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const testDb = async () => {
  try {
    await database.authenticate();
    console.log("database connection established");
  } catch (e) {
    console.log(e);
    console.log("database connection failed");
  }
};

testDb();

export default database;
