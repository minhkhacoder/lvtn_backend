/** @format */

const express = require("express");
const { getAllProductByCategory } = require("../controllers/search");
const router = express.Router();

router.get("/category", getAllProductByCategory);

module.exports = router;
