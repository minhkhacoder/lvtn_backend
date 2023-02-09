/** @format */

const Customer = require("../models/customer");

const customer = new Customer();
const updateCustomer = async (req, res) => {
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

module.exports = {
  updateCustomer,
};
