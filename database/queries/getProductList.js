const { pool } = require('../index');

const getProductList = (callback) => {
  const queryString = 'SELECT * FROM product_list ORDER BY id ASC LIMIT 20;';

  pool.query(queryString, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.rows);
    }
  });
};

module.exports = getProductList;
