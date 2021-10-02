const express = require('express');

const app = express();
const port = 4444;

app.listen(port, (err) => {
  if (err) {
    console.log('Error creating Server');
  } else {
    console.log(`Listening on port ${port}`);
  }
});
