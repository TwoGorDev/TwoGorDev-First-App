// Imports
const express = require('express');
const router = express.Router();

// Auth middleware
const { requireUser } = require('../middleware/auth/requireUser');

// Controllers
const {
  createMeal
} = require('../controllers/mealController');

router.post('/meals', requireUser, createMeal);


module.exports = router;