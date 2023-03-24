/** @format */

const Orders = require("../models/orders");
const OrderDetail = require("../models/order_detail");
const orders = new Orders();
const orderDetail = new OrderDetail();

const createOrder = async (req, res) => {
  const { acc_id, ship_id, pay_id, order_detail } = req.body;
  const now = new Date(); // Lấy thời gian hiện tại
  const formattedDate =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1) +
    "-" +
    now.getDate() +
    " " +
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":" +
    now.getSeconds();
  try {
    const orderId = await orders.createOrder(
      acc_id,
      ship_id,
      pay_id,
      formattedDate
    );

    for (let i = 0; i < order_detail.length; i++) {
      const { pro_id, ordt_quantity, ordt_price } = order_detail[i];
      let price = ordt_price * ordt_quantity;
      let isCreateOrder = await orderDetail.createOrderDetail(
        orderId,
        pro_id,
        ordt_quantity,
        price
      );
      if (isCreateOrder === false)
        return res.status(400).json({
          success: false,
          message: "Create order failed!",
        });
    }

    res.status(200).json({
      success: true,
      message: "Check out success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
};
