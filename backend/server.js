// Imports
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const corsOptions = require('./utilities/corsOptions');
const pool = require('./pool');
const { errorHandler } = require('./middleware/errors/errorHandling');

// Routers
const usersAuthRouter = require('./routes/user-auth-route');
const productsRouter = require('./routes/product-route');
const usersRouter = require('./routes/user-route');

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(usersAuthRouter)
app.use(productsRouter);
app.use(usersRouter);
app.use(errorHandler)

// Connect to db and start the server
pool
  .query('SELECT 1 + 1;')
  .then(() => {
    app.listen(4000, () => {
      console.log("App is connected to the database and running on port 4000");
    })
  })
  .catch((err) => console.error(err));