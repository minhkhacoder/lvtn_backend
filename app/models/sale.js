/** @format */

class Sale {
  constructor(sale_id, sale_name, sale_dateStart, sale_dateEnd) {
    this.sale_id = sale_id;
    this.sale_name = sale_name;
    this.sale_dateStart = sale_dateStart;
    this.sale_dateEnd = sale_dateEnd;
  }

  createSale(sale) {
    const sql = `INSERT INTO sale(sale_name, sale_dateStart, sale_dateEnd) VALUES(?,?,?)`;
    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [sale.sale_name, sale.sale_dateStart, sale.sale_dateEnd],
        (err, result) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }
}
