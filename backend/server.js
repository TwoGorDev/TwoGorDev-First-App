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
const summaryRouter = require('./routes/summaryRoute');
const portionRouter = require('./routes/portionRoute');
const goalRouter = require('./routes/goalRoute');

// Middleware
app.use(cors(corsOptions));
app.use((req, res, next) => {console.log(req.method, 'request made to: ', req.path); next()})
app.use(express.json({ limit: 52428800 }));
app.use(usersAuthRouter);
app.use(productsRouter);
app.use(usersRouter);
app.use(mealsRouter);
app.use(summaryRouter);
app.use(portionRouter);
app.use(goalRouter);

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