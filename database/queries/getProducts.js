const { pool } = require('../index');

const getProducts = (callback) => {
  const queryString = 'SELECT * FROM product_list ORDER BY id DESC LIMIT 20;';

  pool.query(queryString, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.rows);
    }
  });
};

module.exports = getProducts;
