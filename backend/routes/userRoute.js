// Imports
const express = require('express');
const router = express.Router();

// Middleware
const { requireUser } = require('../middleware/auth/requireUser');

// Controllers
const {
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Routes
router.get('/users/:id', requireUser, getUserById);

router.patch('/users', requireUser, updateUser);

router.delete('/users', requireUser, deleteUser);

module.exports = router;