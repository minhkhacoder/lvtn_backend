/** @format */

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../authentication/auth");
const { getAllProducer, createProducer } = require("../controllers/producer");

router.get("/all", getAllProducer);
router.post("/create", verifyToken, createProducer);

module.exports = router;
