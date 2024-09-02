"use strict";
require("dotenv").config();
module.exports = {
  dialect: process.env.DB_CONNECTION,
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  USER: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};