/** @format */

const express = require("express");
const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsPaginationBySellerId,
  getProductSellerById,
} = require("../controllers/product");
const router = express.Router();
const { verifyToken } = require("../authentication/auth");

router.post("/seller/create", verifyToken, createProduct);
router.get("/", getProductById);
router.get("/all", getAllProducts);
router.get("/seller/all", verifyToken, getAllProductsPaginationBySellerId);
router.put("/seller/update", verifyToken, updateProduct);
router.delete("/seller/delete/:id", verifyToken, deleteProduct);
router.get("/seller", verifyToken, getProductSellerById);

module.exports = router;
