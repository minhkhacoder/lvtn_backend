/** @format */

const express = require("express");
const { verifyToken } = require("../authentication/auth");
const { createSeller, updateSeller } = require("../controllers/seller");
const router = express.Router();

router.post("/create", verifyToken, createSeller);
router.post("/update", verifyToken, updateSeller);

module.exports = router;
