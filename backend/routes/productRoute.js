// Imports
const express = require('express');
const router = express.Router();

// Auth middleware
const { requireUser } = require('../middleware/auth/requireUser');

// Controllers
const {
  getProducts,
  getProductsByNameSearch,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Routes

// Fetch all products
router.get('/products', getProducts);

// Fetch products by name search
router.get('/products/search/:query', getProductsByNameSearch);

// Fetch a single product
router.get('/products/:id', getProduct);

// Create new product
router.post('/products', requireUser, createProduct);

// Update existing product
// router.put('/products/:id', requireUser, updateProduct);

// Delete exisitng product
// router.delete('/products/:id', requireUser, deleteProduct);

module.exports = router;