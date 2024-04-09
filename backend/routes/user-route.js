const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/user-controller');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;