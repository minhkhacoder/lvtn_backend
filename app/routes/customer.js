/** @format */

const express = require("express");
const { verifyToken } = require("../authentication/auth");
const {
  login,
  signup,
  updatePasswordCustomer,
  updateInfoCustomer,
  updateAddressCustomer,
} = require("../controllers/customer");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.put("/update-password", verifyToken, updatePasswordCustomer);
router.put("/update-info", verifyToken, updateInfoCustomer);
router.put("/update-address", verifyToken, updateAddressCustomer);

module.exports = router;
