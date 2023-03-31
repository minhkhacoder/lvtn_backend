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
const orderRoutes = require("./app/routes/orders");
const shipRoutes = require("./app/routes/shipping");
const paymentRoutes = require("./app/routes/payment");
const searchRoutes = require("./app/routes/search");

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
app.use("/order", orderRoutes);
app.use("/shipping", shipRoutes);
app.use("/payment", paymentRoutes);
app.use("/search", searchRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
