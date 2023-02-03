/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 3000;
const db = require("./app/common/database");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

// Check connect database
db.getConnection(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const authRoutes = require("./app/routes/auth");
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
