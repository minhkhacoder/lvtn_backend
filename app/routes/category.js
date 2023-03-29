/** @format */

const express = require("express");
const {
  getAllCategory,
  getCategoryByParentId,
} = require("../controllers/category");
const router = express.Router();

router.get("/all", getAllCategory);
router.get("/parent", getCategoryByParentId);

module.exports = router;
