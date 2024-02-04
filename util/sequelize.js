const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = process.env.DATABASE;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize({
  username: "root",
  password: `${password}`,
  database: `${db}`,
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
