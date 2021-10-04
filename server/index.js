const express = require('express');
const cors = require('cors');
const { getProductList } = require('../database/queries/index');

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

// app.get('/products/:id/sytles')

// app.get('/products/:id/related')

app.listen(port, (err) => {
  if (err) {
    console.log('Error creating Server');
  } else {
    console.log(`Listening on port ${port}`);
  }
});
