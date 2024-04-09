const express = require('express');
const app = express();
require('dotenv').config();
const pool = require('./pool');

// Routes
const usersAuthRouter = require('./routes/user-auth-route');
const productsRouter = require('./routes/product-route');
const usersRouter = require('./routes/user-route');

app.use(express.json());
app.use(usersAuthRouter)
app.use(productsRouter);
app.use(usersRouter);

const userRepo = require('./repos/user-repo')

app.post('/register', async (req, res) => {
  const {username, email, password} = req.body;

  const user = await userRepo.insert(username, email, password)

  res.send(user);
})

// Run a query to establish a connection with the database
// and then start the server
pool
  .query('SELECT 1 + 1;')
  .then(() => {
    app.listen(4000, () => {
      console.log("App is connected to the database and running on port 4000");
    })
  })
  .catch((err) => console.error(err));