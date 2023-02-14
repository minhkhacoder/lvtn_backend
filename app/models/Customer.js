/** @format */

const db = require("../common/database");

class Customer {
  constructor(
    cus_id,
    acc_id,
    cus_userName,
    cus_email,
    cus_gender,
    cus_address
  ) {
    this.cus_id = cus_id;
    this.acc_id = acc_id;
    this.cus_userName = cus_userName;
    this.cus_email = cus_email;
    this.cus_gender = cus_gender;
    this.cus_address = cus_address;
  }

  getInfoCustomerByAccId(acc_id) {
    const sql = "SELECT * FROM customer WHERE acc_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [acc_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  updateCustomer(cus_id, cus_userName, cus_email, cus_gender, cus_address) {
    const sql = "SELECT fn_update_customer(?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [cus_id, cus_userName, cus_email, cus_gender, cus_address],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }
}

module.exports = Customer;
