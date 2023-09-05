const {
  DB_DIALECT, 
  DB_USERNAME, 
  DB_PASSWORD, 
  DB_HOST, 
  DB_PORT, 
  DB_NAME_DATABASE_DEV,
  DB_NAME_DATABASE_TEST,
  DB_NAME_DATABASE_PROD,
  NODE_ENV
} = process.env;

const NAME_DB = NODE_ENV === "development" ? DB_NAME_DATABASE_DEV : NODE_ENV === "test" ? DB_NAME_DATABASE_TEST : DB_NAME_DATABASE_PROD;

const uri_database = `${DB_DIALECT}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${NAME_DB}`;

export default {
  uri: uri_database, 
  define: {
    timestamps: false,
    underscored: false,
  },
  logging: false
};
