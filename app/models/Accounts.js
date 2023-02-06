/** @format */
const db = require("../common/database");

class Accounts {
  constructor(acc_id, acc_phone, acc_password, acc_role) {
    this.acc_id = acc_id;
    this.acc_phone = acc_phone;
    this.acc_password = acc_password;
    this.acc_role = acc_role;
  }

  createAccount(username, phone, password) {
    const sql = "CALL sp_signup_account(?,?,?)";
    return new Promise((resolve, reject) => {
      db.query(sql, [username, phone, password], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  getAllAccounts() {
    const sql = "SELECT * FROM accounts";
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  findWithPassword(phone) {
    const sql = "SELECT * FROM accounts WHERE acc_phone = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [phone], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = Accounts;
