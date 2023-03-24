/** @format */

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../authentication/auth");
const { createOrder } = require("../controllers/orders");

router.post("/create", verifyToken, createOrder);

module.exports = router;
