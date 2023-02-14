/** @format */

const port = 3000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require("./app/routes/auth");
const customerRoutes = require("./app/routes/customer");
const sellerRoutes = require("./app/routes/seller");

app.use("/auth", authRoutes);
app.use("/customer", customerRoutes);
app.use("/seller", sellerRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
