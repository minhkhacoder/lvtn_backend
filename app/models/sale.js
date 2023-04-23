/** @format */
const db = require("../common/database");
class Sale {
  constructor(sale_id, sale_name, sale_dateStart, sale_dateEnd) {
    this.sale_id = sale_id;
    this.sale_name = sale_name;
    this.sale_dateStart = sale_dateStart;
    this.sale_dateEnd = sale_dateEnd;
  }

  createSale(sale_name, sale_dateStart, sale_dateEnd) {
    const sql = `INSERT INTO sale(sale_name, sale_dateStart, sale_dateEnd) VALUES(?,?,?)`;
    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [sale_name, sale_dateStart, sale_dateEnd],
        (err, result) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }

  getSaleId(sale_name, sale_dateStart, sale_dateEnd) {
    const sql = `SELECT sale_id FROM sale WHERE sale_name = ? AND sale_dateStart = ? AND sale_dateEnd = ?`;
    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [sale_name, sale_dateStart, sale_dateEnd],
        (err, result) => {
          if (err) reject(err);
          resolve(result[0].sale_id);
        }
      );
    });
  }
}

module.exports = Sale;
