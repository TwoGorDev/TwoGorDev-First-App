// Imports
const express = require('express');
const router = express.Router();

// Controllers
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/user-controller');

// Routes
router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;