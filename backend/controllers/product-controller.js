const productRepo = require('../repositories/product-repo');

const getProducts = async (req, res) => {
  const products = await productRepo.findAll();

  res.send(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productRepo.findById(id);

  if (product) {
    res.send(product);
  }
  else {
    res.sendStatus(404);
  }
};

const createProduct = async (req, res) => {
  const { name, calories, proteins, carbohydrates, fats } = req.body;

  const product = await productRepo.insert(name, calories, proteins, carbohydrates, fats);

  res.send(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, calories, proteins, carbohydrates, fats } = req.body;

  const product = await productRepo.update(id, name, calories, proteins, carbohydrates, fats);

  if (product) {
    res.send(product);
  }
  else {
    res.sendStatus(404);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productRepo.delete(id);

  if (product) {
    res.send(product);
  }
  else {
    res.sendStatus(404);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}