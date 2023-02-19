/** @format */

class SaleProduct {
  constructor(sale_id, pro_id, ps_value, ps_status) {
    this.sale_id = sale_id;
    this.pro_id = pro_id;
    this.ps_value = ps_value;
    this.ps_status = ps_status;
  }

  createSaleProduct(ps) {
    const sql = `INSERT INTO saleproduct(sale_id, pro_id, ps_value, ps_status) VALUES(?,?,?,?)`;
    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [ps.sale_id, ps.pro_id, ps.ps_value, ps.ps_status],
        (err, result) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }
}
