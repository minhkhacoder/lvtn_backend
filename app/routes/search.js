/** @format */

const express = require("express");
const {
  getAllProductByCategory,
  filterProducts,
  searchProductByKey,
} = require("../controllers/search");
const router = express.Router();

router.get("/category", getAllProductByCategory);
router.get("/filter", filterProducts);
router.get("/", searchProductByKey);

module.exports = router;
