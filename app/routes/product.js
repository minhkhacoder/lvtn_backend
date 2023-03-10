/** @format */

const express = require("express");
const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const router = express.Router();
const { verifyToken } = require("../authentication/auth");

router.post("/seller/create", verifyToken, createProduct);
router.get("/", getProductById);
router.put("/seller/update", verifyToken, updateProduct);
router.delete("/seller/delete", verifyToken, deleteProduct);

module.exports = router;
