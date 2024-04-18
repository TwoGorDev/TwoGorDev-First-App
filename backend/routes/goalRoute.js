// Imports
const express = require('express');
const router = express.Router();

// Auth middleware
const { requireUser } = require('../middleware/auth/requireUser');

// Controllers
const {
  getGoal
} = require('../controllers/goalsController');

// Routes
router.get('/goals/:date', requireUser, getGoal);

module.exports = router;