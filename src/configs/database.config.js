import { Sequelize } from "sequelize";
import env from "#configs/env";

const config = {
  development: {
    username: env.DB_USER || "root",
    password: env.DB_PASS || "password",
    database: env.DB_NAME || "mydatabase",
    host: env.DB_HOST || "localhost",
    dialect: env.DB_DIALECT || "mysql", // Change to "postgres", "sqlite", etc.
  },
  production: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: env.DB_DIALECT || "mysql",
    logging: false, // Disable logging in production
  },
};

// Select the correct config based on NODE_ENV
const environment = env.NODE_ENV ?? "development";
const sequelize = new Sequelize(
  config[environment].database,
  config[environment].username,
  config[environment].password,
  {
    host: config[environment].host,
    dialect: config[environment].dialect,
    logging: environment === "development" ? console.log : false, // Show logs only in development
  },
);

export default sequelize;
