/** @format */
const Sale = require("../models/sale");
const SaleProduct = require("../models/sale_product");
const sales = new Sale();
const saleProducts = new SaleProduct();

const createSale = async (req, res) => {
  try {
    const { name, dateStart, dateEnd, pro_id, ps_value } = req.body;
    console.log(pro_id);
    if (pro_id.length === 0 || !ps_value) {
      return res.status(400).json({
        success: false,
        message: "Created sale failed!",
      });
    }
    const resultSale = await sales.createSale(name, dateStart, dateEnd);

    if (!resultSale) {
      return res.status(400).json({
        success: false,
        message: "Created sale failed!",
      });
    }

    const saleId = await sales.getSaleId(name, dateStart, dateEnd);
    const proIds = Array.isArray(pro_id) ? pro_id : [pro_id];

    const saleProductPromises = proIds.map((pro, i) => {
      const saleProduct = {
        sale_id: saleId,
        pro_id: pro,
        ps_value: ps_value,
      };
      return saleProducts.createSaleProduct(saleProduct);
    });

    const results = await Promise.all(saleProductPromises);
    const flag = results.every((result) => result);

    const status = flag ? 201 : 400;
    const message = flag
      ? "Created sale successfully!"
      : "Created sale failed!";

    res.status(status).json({ success: flag, message });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSaleProductBySellerId = async (req, res) => {
  try {
    const { sellerId } = req.query;

    const results = await saleProducts.getSaleProductBySellerId(sellerId);
    const productsMap = {};
    const salesMap = {};
    results.forEach((element) => {
      const product = {
        proId: element.proId,
        proName: element.proName,
        proPrice: parseFloat(element.pro_price),
        image: element.image,
      };
      if (!productsMap[element.proId]) {
        productsMap[element.proId] = product;
        if (!salesMap[element.id]) {
          salesMap[element.id] = {
            id: element.id,
            nameSale: element.nameSale,
            dateStart: element.dateStart,
            dateEnd: element.dateEnd,
            value: element.ps_value,
            products: [],
          };
        }
        salesMap[element.id].products.push(product);
      }
    });
    res.status(200).json({
      success: true,
      data: Object.values(salesMap),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSale,
  getSaleProductBySellerId,
};
