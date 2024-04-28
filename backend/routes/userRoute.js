// Imports
const express = require('express');
const router = express.Router();

// Middleware
const { requireUser } = require('../middleware/auth/requireUser');

// Controllers
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Routes
// router.get('/users', getUsers);

router.get('/users/:id', requireUser, getUserById);

router.patch('/users', requireUser, updateUser);

router.delete('/users/:id', requireUser, deleteUser);

module.exports = router;