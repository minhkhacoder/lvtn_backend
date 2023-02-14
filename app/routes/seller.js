/** @format */

const express = require("express");
const { createSeller, updateSeller } = require("../controllers/seller");
const router = express.Router();

router.post("/create", createSeller);
router.post("/update", updateSeller);

module.exports = router;
