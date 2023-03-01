/** @format */

const port = 3000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

const customerRoutes = require("./app/routes/customer");
const sellerRoutes = require("./app/routes/seller");
const productRoutes = require("./app/routes/product");
const categoryRoutes = require("./app/routes/category");
const brandRoutes = require("./app/routes/brand");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 1024 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/customer", customerRoutes);
app.use("/seller", sellerRoutes);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/brand", brandRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
