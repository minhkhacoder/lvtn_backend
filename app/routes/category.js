/** @format */

const express = require("express");
const { getAllCategory } = require("../controllers/category");
const router = express.Router();

router.get("/all", getAllCategory);

module.exports = router;
