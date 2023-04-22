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

const getOrderFilter = async (req, res) => {
  try {
    const { id, phone, status, pay, dateStart, dateEnd, page, limit } =
      req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const formatPhone =
      phone && phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    const result = await orders.getOrderFilter(
      id,
      formatPhone,
      status,
      pay,
      dateStart,
      dateEnd
    );

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

const getOrderDetailById = async (req, res) => {
  try {
    const { orderId } = req.query;
    const result = await orders.getOrderDetailById(orderId);

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

const getAllOrderStatusBySellerId = async (req, res) => {
  try {
    const { sellerId } = req.query;

    const result = await orders.getOrderBySellerId(sellerId);

    const ordersMap = {};

    await Promise.all(
      result.map(async (cur) => {
        if (!ordersMap[cur.or_id]) {
          ordersMap[cur.or_id] = {
            or_id: cur.or_id,
            ship: cur.ship,
            payment: cur.payment,
            address: cur.or_address,
            status: cur.or_status,
            createdAt: cur.or_createdAt,
          };
        }
      })
    );
    const currentResult = Object.values(ordersMap);
    let data = new Array(7);
    let status1 = 0;
    let status2 = 0;
    let status3 = 0;
    let status4 = 0;
    let status5 = 0;
    let status6 = 0;
    let status7 = 0;

    for (let index = 0; index < currentResult.length; index++) {
      switch (currentResult[index].status) {
        case 0:
          status1++;
          data[0] = { id: 0, name: "Pending", count: status1 };
          break;
        case 1:
          status2++;
          data[1] = { id: 1, name: "Confirmed", count: status2 };
          break;
        case 2:
          status3++;
          data[2] = { id: 2, name: "Shipping", count: status3 };
          break;
        case 3:
          status4++;
          data[3] = { id: 3, name: "Delivered", count: status4 };
          break;
        case 4:
          data[4] = { id: 4, name: "Completed", count: status5 };
          status5++;
          break;
        case 5:
          status6++;
          data[5] = { id: 5, name: "Cancelled", count: status6 };
          break;
        case 6:
          status7++;
          data[6] = { id: 6, name: "Return", count: status7 };
          break;
        default:
          break;
      }
    }
    data[0] =
      status1 === 0
        ? { id: 0, name: "Pending", count: status1 }
        : { ...data[0] };
    data[1] =
      status2 === 0
        ? { id: 0, name: "Confirmed", count: status2 }
        : { ...data[1] };
    data[2] =
      status3 === 0
        ? { id: 0, name: "Shipping", count: status3 }
        : { ...data[2] };
    data[3] =
      status4 === 0
        ? { id: 0, name: "Delivered", count: status4 }
        : { ...data[3] };
    data[4] =
      status5 === 0
        ? { id: 0, name: "Completed", count: status5 }
        : { ...data[4] };
    data[5] =
      status6 === 0
        ? { id: 0, name: "Cancelled", count: status6 }
        : { ...data[5] };
    data[6] =
      status7 === 0
        ? { id: 0, name: "Return", count: status7 }
        : { ...data[6] };

    res.status(200).json({
      success: true,
      data: data,
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
  getAllOrderByAccountId,
  getAllOrderBySellerId,
  getOrderDetailById,
  updateStatusOrder,
  getOrderFilter,
  getAllOrderStatusBySellerId,
};
