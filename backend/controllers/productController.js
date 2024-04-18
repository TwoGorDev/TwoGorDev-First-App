// Imports
const productRepo = require('../repos/productRepo');
const CustomError = require('../utilities/customError');
const { validateProductFormat } = require('../validators/productValidator');

// Get all products
const getProducts = async (req, res, next) => {
  try {
    const products = await productRepo.findAll();

    res.status(200).json(products);

  } catch(error) {
    next(error);
  }
};

// Get products by name search
const getProductsByNameSearch = async (req, res, next) => {
  try {
    const { query } = req.params;

    const products = await productRepo.findAllLike(query);

    if (!products) {
      throw new CustomError(404, 'Products not found');
    }

    res.status(200).json(products);
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

    res.status(200).json(product);

  } catch(error) {
    next(error);
  }
};

// Create new product
const createProduct = async (req, res, next) => {
  try {
    const newProduct = req.body;
    const { id: userId } = req.user;

    validateProductFormat(newProduct);

    const product = await productRepo.insert(newProduct, userId);

    if (!product) {
      throw new CustomError(500, 'Creating new product failed');
    }

    res.status(200).json(product);

  } catch(error) {
    next(error);
  }
};

// Update existing product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;

    if (!id) {
      throw new CustomError(500, 'Product id required');
    }

    validateProductFormat(updatedProduct);

    const product = await productRepo.update(id, updatedProduct);

    if (!product) {
      throw new CustomError(404, 'Product not found');
    }

    res.status(200).json(product);

  } catch(error) {
    next(error);
  }
};

// Delete existing product
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
    
    res.status(200).json(product);

  } catch(error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductsByNameSearch,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}