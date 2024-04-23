// Imports
const express = require('express');
const router = express.Router();

// Auth middleware
const { requireUser } = require('../middleware/auth/requireUser');

// Controllers
const {
  getDailySummary
} = require('../controllers/summaryController');

// Routes
router.get('/daily-summary/:date', requireUser, getDailySummary);

module.exports = router;