/** @format */

const Orders = require("../models/orders");
const Seller = require("../models/seller");
const OrderDetail = require("../models/order_detail");
const Product = require("../models/product");
const Customer = require("../models/customer");
const orders = new Orders();
const orderDetail = new OrderDetail();
const product = new Product();
const sellers = new Seller();
const customers = new Customer();

const createOrder = async (req, res) => {
  const { acc_id, ship_id, pay_id, or_address, order_detail } = req.body;
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
      or_address,
      formattedDate
    );

    for (let i = 0; i < order_detail.length; i++) {
      const { pro_id, ordt_quantity, ordt_price } = order_detail[i];
      let isCreateOrder = await orderDetail.createOrderDetail(
        orderId,
        pro_id,
        ordt_quantity,
        ordt_price
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

const getAllOrderByAccountId = async (req, res) => {
  try {
    const { accId } = req.query;
    const result = await orders.getOrderByAccountId(accId);
    const detailsMap = {};
    const ordersMap = {};

    await Promise.all(
      result.map(async (cur) => {
        const [products] = await Promise.all([
          product.getProductById(cur.pro_id),
        ]);
        const [seller] = await Promise.all([
          sellers.getSellerById(products.seller_id),
        ]);
        const detail = {
          ordt_id: cur.ordt_id,
          quantity: cur.quantity,
          total: parseFloat(cur.total_price),
          products: {
            ...products,
            pro_price: parseFloat(products.pro_price),
            image: cur.img_url,
            seller: seller[0],
          },
        };
        if (!detailsMap[cur.ordt_id]) {
          detailsMap[cur.ordt_id] = detail;
          if (!ordersMap[cur.or_id]) {
            ordersMap[cur.or_id] = {
              or_id: cur.or_id,
              acc_id: cur.acc_id,
              ship: cur.ship,
              payment: cur.payment,
              address: cur.or_address,
              status: cur.or_status,
              createdAt: cur.or_createdAt,
              details: [],
            };
          }
          ordersMap[cur.or_id].details.push(detail);
        }
      })
    );

    res.status(200).json({
      success: true,
      data: Object.values(ordersMap),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrderBySellerId = async (req, res) => {
  try {
    const { sellerId, page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = await orders.getOrderBySellerId(sellerId);

    const detailsMap = {};
    const ordersMap = {};

    await Promise.all(
      result.map(async (cur) => {
        const [products] = await Promise.all([
          product.getProductById(cur.pro_id),
        ]);
        const [seller, customer] = await Promise.all([
          sellers.getSellerById(products.seller_id),
          customers.getInfoCustomerByAccId(cur.acc_id),
        ]);
        const detail = {
          ordt_id: cur.ordt_id,
          quantity: cur.quantity,
          total: parseFloat(cur.total_price),
          products: {
            ...products,
            pro_price: parseFloat(products.pro_price),
            image: cur.img_url,
            seller: seller[0],
          },
        };
        if (!detailsMap[cur.ordt_id]) {
          detailsMap[cur.ordt_id] = detail;
          if (!ordersMap[cur.or_id]) {
            ordersMap[cur.or_id] = {
              or_id: cur.or_id,
              customer: customer[0],
              ship: cur.ship,
              payment: cur.payment,
              address: cur.or_address,
              status: cur.or_status,
              createdAt: cur.or_createdAt,
              details: [],
            };
          }
          ordersMap[cur.or_id].details.push(detail);
        }
      })
    );
    const currentResult = Object.values(ordersMap).slice(startIndex, endIndex);
    res.status(200).json({
      success: true,
      total: Object.values(ordersMap).length,
      data: currentResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrderById = async (req, res) => {
  try {
    const { orderId } = req.query;
    const result = await orders.getOrderById(orderId);

    const detailsMap = {};
    const ordersMap = {};

    await Promise.all(
      result.map(async (cur) => {
        const [products] = await Promise.all([
          product.getProductById(cur.pro_id),
        ]);
        const [seller, customer] = await Promise.all([
          sellers.getSellerById(products.seller_id),
          customers.getInfoCustomerByAccId(cur.acc_id),
        ]);
        const detail = {
          ordt_id: cur.ordt_id,
          quantity: cur.quantity,
          total: parseFloat(cur.total_price),
          products: {
            ...products,
            pro_price: parseFloat(products.pro_price),
            image: cur.img_url,
            seller: seller[0],
          },
        };
        if (!detailsMap[cur.ordt_id]) {
          detailsMap[cur.ordt_id] = detail;
          if (!ordersMap[cur.or_id]) {
            ordersMap[cur.or_id] = {
              or_id: cur.or_id,
              customer: customer[0],
              ship: cur.ship,
              payment: cur.payment,
              address: cur.or_address,
              status: cur.or_status,
              createdAt: cur.or_createdAt,
              details: [],
            };
          }
          ordersMap[cur.or_id].details.push(detail);
        }
      })
    );
    res.status(200).json({
      success: true,
      data: Object.values(ordersMap),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateStatusOrder = async (req, res) => {
  try {
    const { status, orderId } = req.body;
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

    const result = await orders.updateStatusOrder(
      orderId,
      status,
      formattedDate
    );
    if (result) {
      res.status(200).json({
        success: true,
        message: "Updated status order successfully!",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to update status order",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrderByAccountId,
  getAllOrderBySellerId,
  getAllOrderById,
  updateStatusOrder,
};
