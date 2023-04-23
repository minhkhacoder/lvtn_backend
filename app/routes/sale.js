/** @format */

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../authentication/auth");
const { createSale, getSaleProductBySellerId } = require("../controllers/sale");

router.post("/create", verifyToken, createSale);
router.get("/all", verifyToken, getSaleProductBySellerId);

module.exports = router;
