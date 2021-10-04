const express = require('express');
const cors = require('cors');
const {
  getProductList,
  getProductStyles,
} = require('../database/queries/index');

const app = express();
const port = 4444;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Connected to the Database');
});

app.get('/products', (req, res) => {
  getProductList((err, allProducts) => {
    if (err) {
      console.log('Error to retrieve all products');
      res.status(404).send();
    } else {
      res.send(allProducts);
    }
  });
});

// app.get('/products/:id', (req, res) => {
//   getProductInfo()
// });

app.get('/products/:product_id/sytles', (req, res) => {
  const productId = req.params.product_id;
  getProductStyles(productId, (err, stylesData) => {
    if (err) {
      console.log('Error retrieving styles data');
      res.status(404).send();
    } else {
      res.send(stylesData);
    }
  });
});

// app.get('/products/:id/related')

app.listen(port, (err) => {
  if (err) {
    console.log('Error creating Server');
  } else {
    console.log(`Listening on port ${port}`);
  }
});
