const express = require('express');
const productRepo = require('../repos/product-repo');

const router = express.Router();

router.get('/products', async (req, res) => {
  const products = await productrRepo.find();

  res.send(products);
});

router.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  const product = await productRepo.findById(id);

  if (product) {
    res.send(product);
  }
  else {
    res.sendStatus(404);
  }
});

router.post('/products', async (req, res) => {
  const { name, calories, proteins, carbohydrates, fats } = req.body;

  const product = await productRepo.insert(name, calories, proteins, carbohydrates, fats);

  res.send(product);
});

router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, calories, proteins, carbohydrates, fats } = req.body;

  const product = await productRepo.update(id, name, calories, proteins, carbohydrates, fats);

  if (product) {
    res.send(product);
  }
  else {
    res.sendStatus(404);
  }
});

router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  const product = await productRepo.delete(id);

  if (product) {
    res.send(product);
  }
  else {
    res.sendStatus(404);
  }
});

module.exports = router;