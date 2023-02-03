/** @format */

const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "root",
  password: "password",
  database: "lvtn",
});

module.exports = db;
