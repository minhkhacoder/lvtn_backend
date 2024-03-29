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

  vertifyAccountCustomer(phone, password) {
    const sql =
      "SELECT * FROM accounts WHERE acc_phone = ? AND acc_password = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [phone, password], (err, result) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  vertifyAccountSeller(phone, password, role) {
    const sql =
      "SELECT * FROM accounts WHERE acc_phone = ? AND acc_password = ? AND acc_role = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [phone, password, role], (err, result) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  findOne(id, callback) {
    const sql = `SELECT * FROM accounts WHERE acc_id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err);
      callback(null, result[0]);
    });
  }

  // findRoleAccount(phone) {
  //   const sql = "SELECT acc_role FROM accounts WHERE acc_phone = ?";
  //   return new Promise((resolve, reject) => {
  //     db.query(sql, [phone], (err, result) => {
  //       if (err) return reject(err);
  //       resolve(result[0].acc_role);
  //     });
  //   });
  // }

  updatePasswordAccount(acc_id, password_old, password_new) {
    const sql = "SELECT fn_update_password(?,?,?)";
    return new Promise((resolve, reject) => {
      db.query(sql, [acc_id, password_old, password_new], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = Accounts;
