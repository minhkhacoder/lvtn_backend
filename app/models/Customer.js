/** @format */

const db = require("../common/database");
const Accounts = require("./accounts");

class Customer extends Accounts {
  constructor(
    cus_id,
    acc_id,
    cus_userName,
    cus_email,
    cus_gender,
    cus_address,
    cus_avatar
  ) {
    super(acc_id);
    this.cus_id = cus_id;
    this.cus_userName = cus_userName;
    this.cus_email = cus_email;
    this.cus_gender = cus_gender;
    this.cus_address = cus_address;
    this.cus_avatar = cus_avatar;
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

  updateCustomer(
    cus_id,
    cus_userName,
    cus_email,
    cus_gender,
    cus_address,
    cus_avatar
  ) {
    let sql = `
      UPDATE customer
      SET 
        cus_userName = ?,
        cus_email = ?,
        cus_gender = ?,
        cus_address = ?`;

    const params = [cus_userName, cus_email, cus_gender, cus_address];

    if (cus_avatar) {
      sql += ", cus_avatar = ?";
      params.push(cus_avatar);
    }

    sql += " WHERE cus_id = ?";

    params.push(cus_id);

    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, result) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  updateAddressCustomer(cus_id, cus_address) {
    let sql = `
      UPDATE customer
      SET 
        cus_address = ?
      WHERE cus_id = ?`;

    const params = [cus_address, cus_id];

    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, result) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  getLinkAvatarCustomer(id) {
    const sql = "SELECT cus_avatar FROM customer WHERE cus_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result[0].cus_avatar);
      });
    });
  }
}

module.exports = Customer;
