/** @format */

const db = require("../common/database");

class OrderDetail {
  constructor(or_id, pro_id, ordt_quantity, ordt_price) {
    this.or_id = or_id;
    this.pro_id = pro_id;
    this.ordt_quantity = ordt_quantity;
    this.ordt_price = ordt_price;
  }

  async createOrderDetail(or_id, pro_id, ordt_quantity, ordt_price) {
    const sql =
      "INSERT INTO orderdetail (or_id, pro_id, ordt_quantity, ordt_price) VALUES (?, ?, ?, ?)";
    const values = [or_id, pro_id, ordt_quantity, ordt_price];
    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
  }
}

module.exports = OrderDetail;
