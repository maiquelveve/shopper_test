// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: ".env" });

const {
  DB_NAME_DATABASE_DEV,
  DB_NAME_DATABASE_TEST,
  DB_NAME_DATABASE_PROD,
  NODE_ENV
} = process.env;

const NAME_DB = NODE_ENV === "development" ? DB_NAME_DATABASE_DEV : NODE_ENV === "test" ? DB_NAME_DATABASE_TEST : DB_NAME_DATABASE_PROD;

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": NAME_DB,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": NAME_DB,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": NAME_DB,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  }
};
