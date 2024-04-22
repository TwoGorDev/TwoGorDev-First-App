// Imports
const express = require('express');
const router = express.Router();

// Auth middleware
const { requireUser } = require('../middleware/auth/requireUser');

// Controllers
const {
  createGoal
} = require('../controllers/goalController');

// Routes
router.post('/goals', requireUser, createGoal)

module.exports = router;