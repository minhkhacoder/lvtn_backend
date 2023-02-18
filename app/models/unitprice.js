/** @format */

const db = require("../common/database");

class UnitPrice {
  constructor(up_id, pro_id, cla_id, up_price, up_quantity) {
    this.up_id = up_id;
    this.pro_id = pro_id;
    this.cla_id = cla_id;
    this.up_price = up_price;
    this.up_quantity = up_quantity;
  }

  createUnitPrice(unitprice) {
    const sql = "INSERT INTO unitprice VALUES(?,?,?,?,?)";
    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [
          unitprice.up_id,
          unitprice.pro_id,
          unitprice.cla_id,
          unitprice.up_price,
          unitprice.up_quantity,
        ],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }
}

module.exports = UnitPrice;
