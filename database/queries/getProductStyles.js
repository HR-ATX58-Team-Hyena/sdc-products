const { pool } = require('../index');

const getProductStyles = (productId, callback) => {
  const queryString = `SELECT * FROM styles WHERE product_id = ${productId};`;
  // const queryString = `SELECT product_id FROM styles SELECT json_agg(styles) FROM`
  pool.query(queryString, (err, stylesData) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, stylesData);
    }
  });
};

module.exports = getProductStyles;
