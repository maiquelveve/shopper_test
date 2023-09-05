import { Sequelize } from "sequelize";
import configDatabase from "./config/configDatabase";

const connectionSql = new Sequelize(
  configDatabase.uri,
  {
    define: configDatabase.define,
    logging: configDatabase.logging
  }
);

export { connectionSql };
