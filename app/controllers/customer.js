/** @format */

const { validateLogin, validateSignup } = require("../common/validators");
const Customer = require("../models/customer");
const sha = require("sha1");
const jwt = require("jsonwebtoken");

const customer = new Customer();

const login = async (req, res) => {
  const { phone, password } = req.body;

  // Check validator
  const { message, isValid } = validateLogin(req.body);
  if (!isValid)
    return res.status(400).json({ success: false, message: message });

  try {
    const result = await customer.findWithPassword(phone);
    if (!result.length || result[0].acc_password !== sha(password))
      return res
        .status(400)
        .json({ success: false, message: "Phone or password incorrect!" });

    // Generates a JWT token for the current account.
    let token = `${jwt.sign(
      { acc_id: result[0].acc_id, acc_role: result[0].acc_role },
      process.env.ACCESS_TOKEN_SECRET
    )}`;

    let customerInfo = await customer.getInfoCustomerByAccId(result[0].acc_id);

    return res.status(201).json({
      success: true,
      message: "Login successfully!",
      token,
      data: {
        cus_id: customerInfo[0].cus_id,
        acc_id: result[0].acc_id,
        acc_phone: result[0].acc_phone,
        cus_userName: customerInfo[0].cus_userName,
        cus_email: customerInfo[0].cus_email,
        cus_gender: customerInfo[0].cus_gender,
        cus_address: customerInfo[0].cus_address,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Create a new account
const signup = async (req, res) => {
  const { username, phone, password } = req.body;

  // Check validator
  const { message, isValid } = validateSignup(req.body);
  if (!isValid) {
    return res.status(400).json({ success: false, message: message });
  }

  try {
    await customer.createAccount(username, phone, password);
    res.status(201).json({
      success: true,
      message: "Account registered successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Phone number already exists, please use a different phone number.",
      error: error.message,
    });
  }
};

const updateInfoCustomer = async (req, res) => {
  const { id, username, email, gender, address } = req.body;
  try {
    const result = await customer.updateCustomer(
      id,
      username,
      email,
      gender,
      address
    );

    let message = Object.values(result[0])[0];

    res.status(201).json({
      success: true,
      message: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePasswordCustomer = async (req, res) => {
  const { acc_id, password_old, password_new } = req.body;

  try {
    const result = await customer.updatePasswordAccount(
      acc_id,
      password_old,
      password_new
    );

    let message = Object.values(result[0])[0];

    res.status(201).json({
      success: true,
      message: message,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  signup,
  login,
  updateInfoCustomer,
  updatePasswordCustomer,
};
