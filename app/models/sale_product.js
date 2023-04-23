/** @format */
const db = require("../common/database");
class SaleProduct {
  constructor(sale_id, pro_id, ps_value, ps_status) {
    this.sale_id = sale_id;
    this.pro_id = pro_id;
    this.ps_value = ps_value;
    this.ps_status = ps_status;
  }

  createSaleProduct(ps) {
    const sql = `INSERT INTO saleproduct(sale_id, pro_id, ps_value) VALUES(?,?,?)`;
    return new Promise((resolve, reject) => {
      db.query(sql, [ps.sale_id, ps.pro_id, ps.ps_value], (err, result) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  getSaleProductBySellerId(sellerId) {
    const sql = `
    SELECT s.sale_id AS id, s.sale_name AS nameSale, s.sale_dateStart AS dateStart, s.sale_dateEnd AS dateEnd, 
    p.pro_id AS proId, p.pro_name, p.pro_price, img.img_url AS image, ps.ps_value
    FROM saleproduct ps
    JOIN sale s ON ps.sale_id = s.sale_id
    JOIN product p ON ps.pro_id = p.pro_id
    JOIN images img ON ps.pro_id = img.pro_id 
    WHERE p.seller_id = ?;
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [sellerId], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = SaleProduct;
