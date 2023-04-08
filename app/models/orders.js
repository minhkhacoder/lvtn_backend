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

  getOrderByAccountId(id) {
    const sql = `
    SELECT o.or_id, o.acc_id, ship.ship_fee AS ship, pay.pay_name AS payment, 
    o.or_address, o.or_status, o.or_createdAt, ordt.pro_id, ordt.ordt_id ,ordt.ordt_quantity AS quantity, ordt.ordt_price AS total_price,
    img.img_url
    FROM orders o
    JOIN payment pay ON o.pay_id = pay.pay_id
    JOIN shipping ship ON o.ship_id = ship.ship_id
    JOIN orderdetail ordt ON o.or_id = ordt.or_id
    JOIN images img ON ordt.pro_id=img.pro_id 
    WHERE o.acc_id = ?
    ORDER BY o.or_createdAt DESC;`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Orders;
