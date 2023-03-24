/** @format */

const express = require("express");
const { getAllPayment } = require("../controllers/payment");

const router = express.Router();

router.get("/all", getAllPayment);

module.exports = router;
