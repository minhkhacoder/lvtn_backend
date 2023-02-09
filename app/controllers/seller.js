/** @format */

const Seller = require("../models/seller");

const seller = new Seller();

const createSeller = async (req, res) => {
  const { acc_id, name, address } = req.body;

  try {
    const result = await seller.createSeller(acc_id, name, address);

    let message = Object.values(result[0])[0];
    res.status(201).json({
      success: false,
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
  createSeller,
};
