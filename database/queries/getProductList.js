const { pool } = require('../index');

const getProductList = (callback) => {
  const queryString =
    'SELECT (id, name, slogan, description, category, default_price) FROM product_list ORDER BY id ASC LIMIT 5;';

  pool.query(queryString, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.rows);
    }
  });
};

module.exports = getProductList;
