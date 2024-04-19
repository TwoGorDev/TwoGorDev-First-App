// Imports
const express = require('express');
const router = express.Router();

// Auth middleware
const { requireUser } = require('../middleware/auth/requireUser');

// Controllers
const {
  getGoal,
  createGoal
} = require('../controllers/goalsController');

// Routes
router.get('/goals/:date', requireUser, getGoal);

router.post('/goals', requireUser, createGoal)

module.exports = router;