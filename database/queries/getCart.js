const { pool } = require('../index');

const getCart = (userToken, callback) => {
  const queryString = `SELECT ARRAY_AGG(product_id) FROM cart WHERE user_session = ${userToken};`;

  pool.query(queryString, (err, cart) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, cart.rows[0].array_agg);
    }
  });
};

module.exports = getCart;
