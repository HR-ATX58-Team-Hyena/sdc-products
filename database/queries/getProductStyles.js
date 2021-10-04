const { pool } = require('../index');

const getProductStyles = (productId, callback) => {
  const queryString = `SELECT * FROM styles WHERE ${productId};`;

  pool.query(queryString, (err, relatedData) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, relatedData);
    }
  });
};

module.exports = getProductStyles;
