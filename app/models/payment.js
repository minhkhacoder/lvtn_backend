/** @format */

const db = require("../common/database");

class Payment {
  constructor(pay_id, pay_name, pay_avatar) {
    this.pay_id = pay_id;
    this.pay_name = pay_name;
    this.pay_avatar = pay_avatar;
  }

  getAllPayment() {
    const sql = `SELECT * FROM payment`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Payment;
