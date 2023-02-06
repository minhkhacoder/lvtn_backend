/** @format */

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lvtn",
  port: 3308,
});

db.connect((error) => {
  if (error) {
    console.error("Error connecting to database: " + error.stack);
    return;
  }
  console.log("Connected to database");
});

module.exports = db;
