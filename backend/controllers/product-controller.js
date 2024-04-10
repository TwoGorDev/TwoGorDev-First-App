// Imports
const productRepo = require('../repos/product-repo');
const CustomError = require('../utilities/customError');
const { validateProduct } = require('../validators/productValidator');

// Get all products
const getProducts = async (req, res, next) => {
  try {
    const products = await productRepo.findAll();

    res.status(200).send(products);

  } catch(error) {
    next(error);
  }
};

// Get a single product
const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productRepo.findById(id);

    if (!product) {
      throw new CustomError(404, 'Product not found');
    }

    res.status(200).send(product);

  } catch(error) {
    next(error);
  }
};

// Create new product
const createProduct = async (req, res, next) => {
  try {
    const newProduct = req.body;

    validateProduct(newProduct);

    const product = await productRepo.insert(newProduct);

    if (!product) {
      throw new CustomError(404, 'Product not found');
    }

    res.status(200).send(product);

  } catch(error) {
    next(error);
  }
};

// Update an existing product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;

    if (!id) {
      throw new CustomError(500, 'Product id required');
    }

    validateProduct(updatedProduct);

    const product = await productRepo.update(id, updatedProduct);

    if (!product) {
      throw new CustomError(404, 'Product not found');
    }

    res.status(200).send(product);

  } catch(error) {
    next(error);
  }
};

// Delete an existing product
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new CustomError(500, 'Product id required');
    }

    const product = await productRepo.delete(id);

    if (!product) {
      throw new CustomError(404, 'Product not found');
    }
    
    res.status(200).send(product);

  } catch(error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}