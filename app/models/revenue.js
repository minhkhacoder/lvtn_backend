/** @format */

const db = require("../common/database");

class Revenue {
  getRevenueIntervalSixMonth(id) {
    const sql = `
    SELECT YEAR(o.or_createdAt) AS year, MONTHNAME(o.or_createdAt) AS month, SUM(ordt.ordt_quantity * ordt.ordt_price) AS revenue
    FROM orders o
    JOIN orderdetail ordt ON o.or_id = ordt.or_id
    JOIN product p ON ordt.pro_id = p.pro_id
    JOIN seller sell ON p.seller_id = sell.seller_id
    WHERE sell.seller_id = ? AND o.or_createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
    GROUP BY YEAR(o.or_createdAt), MONTH(o.or_createdAt)
    ORDER BY year DESC, MONTH(o.or_createdAt) DESC;
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}
module.exports = Revenue;
