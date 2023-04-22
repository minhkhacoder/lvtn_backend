/** @format */

const Producer = require("../models/producer");

const producer = new Producer();

const getAllProducer = async (req, res) => {
  try {
    const results = await producer.getAllProducer();
    const data = results.map((item) => {
      return { id: item.prod_id, label: item.prod_name };
    });
    if (results?.length > 0) {
      res.status(200).json({
        success: true,
        data: data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Producer can't find",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProducer = async (req, res) => {
  try {
    const { name } = req.body;
    await producer.createProducer(name);
    res.status(201).json({
      success: true,
      message: "Producer brand successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Producer name already exists!",
    });
  }
};

module.exports = {
  getAllProducer,
  createProducer,
};
