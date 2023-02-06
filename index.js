/** @format */

const port = 3000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

const authRoutes = require("./app/routes/auth");

app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
