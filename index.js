/** @format */

const port = 3000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const multer = require("multer");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./app/routes/auth");
const customerRoutes = require("./app/routes/customer");
const sellerRoutes = require("./app/routes/seller");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer().any());
app.use(
  fileUpload({
    limits: { fileSize: 1024 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/auth", authRoutes);
app.use("/customer", customerRoutes);
app.use("/seller", sellerRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
