// Imports
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const corsOptions = require('./utilities/corsOptions');
const pool = require('./pool');
const { errorHandler } = require('./middleware/errors/errorHandling');

// Routers
const usersAuthRouter = require('./routes/userAuthRoute');
const productsRouter = require('./routes/productRoute');
const usersRouter = require('./routes/userRoute');
const mealsRouter = require('./routes/mealRoute');
const dailySummaryRouter = require('./routes/dailySummaryRoute');

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(usersAuthRouter);
app.use(productsRouter);
app.use(usersRouter);
app.use(mealsRouter);
app.use(dailySummaryRouter);
app.use(errorHandler);

// Connect to db and start the server
pool
  .query('SELECT 1 + 1;')
  .then(() => {
    app.listen(4000, () => {
      console.log("App is connected to the database and running on port 4000");
    })
  })
  .catch((err) => console.error(err));