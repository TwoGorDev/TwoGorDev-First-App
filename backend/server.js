const express = require('express');
const app = express();
require('dotenv').config();
const pool = require('./pool')

// Routes
const productsRouter = require('./routes/products-route');

app.use(express.json())
app.use(productsRouter);


// Run a query to establish a connection with the database
// and then start the server
pool
  .query('SELECT 1 + 1;')
  .then(() => {
    app.listen(4000, () => {
      console.log("App is connected to the database and running on port 4000")
    })
  })
  .catch((err) => console.error(err))

