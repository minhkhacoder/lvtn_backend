/** @format */

const express = require("express");
const {
  getAllProductByCategory,
  filterProducts,
} = require("../controllers/search");
const router = express.Router();

router.get("/category", getAllProductByCategory);
router.get("/filter", filterProducts);

module.exports = router;
