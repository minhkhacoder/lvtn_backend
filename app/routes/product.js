/** @format */

const express = require("express");
const { createProduct } = require("../controllers/product");
const router = express.Router();
const { verifyToken } = require("../authentication/auth");

router.post("/create", verifyToken, createProduct);

module.exports = router;
