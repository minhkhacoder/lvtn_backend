/** @format */

const db = require("../common/database");

class Orders {
  constructor(
    or_id,
    acc_id,
    ship_id,
    pay_id,
    or_address,
    or_status,
    or_createdAt,
    or_updatedAt
  ) {
    this.or_id = or_id;
    this.acc_id = acc_id;
    this.ship_id = ship_id;
    this.pay_id = pay_id;
    this.or_address = or_address;
    this.or_status = or_status;
    this.or_createdAt = or_createdAt;
    this.or_updatedAt = or_updatedAt;
  }

  createOrder(acc_id, ship_id, pay_id, or_address, or_createdAt) {
    const sql =
      "INSERT INTO orders (acc_id, ship_id, pay_id,or_address,  or_createdAt) VALUES (?, ?, ?, ?, ?)";
    const values = [acc_id, ship_id, pay_id, or_address, or_createdAt];
    return new Promise((resolve, reject) => {
      db.execute(sql, values, (err, result) => {
        if (err) return reject(err);

        const selectSql =
          "SELECT or_id FROM orders WHERE or_createdAt = ? ORDER BY or_id DESC LIMIT 1";
        const selectValues = [or_createdAt];
        db.execute(selectSql, selectValues, (err, result) => {
          if (err) return reject(err);
          const orderId = result[0].or_id;

          resolve(orderId);
        });
      });
    });
  }
}

module.exports = Orders;
