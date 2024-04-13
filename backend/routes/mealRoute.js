// Imports
const express = require('express');
const router = express.Router();
const mealRepo = require('../repos/mealRepo');

// Auth middleware
const { requireUser } = require('../middleware/auth/requireUser');
const { requireOwner } = require('../middleware/auth/requireOwner');

// Controllers
const {
  createMeal,
  deleteMeal
} = require('../controllers/mealController');

router.post('/meals', requireUser, createMeal);

router.delete('/meals/:id', requireUser, requireOwner(mealRepo), deleteMeal);

module.exports = router;