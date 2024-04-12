// Imports
const express = require('express');
const router = express.Router();

// Auth middleware
const { requireUser } = require('../middleware/auth/requireUser');

// Controllers
const {
  getSummary
} = require('../controllers/dailySummaryController');

// Routes
router.get('/daily-summary/:date', requireUser, getSummary);

module.exports = router;