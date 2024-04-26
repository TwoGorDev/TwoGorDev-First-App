// Imports
const express = require('express');
const router = express.Router();

// Auth middleware
const { requireUser } = require('../middleware/auth/requireUser');

// Controllers
const {
  createPortions,
  deletePortion,
  deleteMultiplePortions
} = require('../controllers/portionController');

// Routes

// Create new portions
router.post('/portions', requireUser, createPortions);

// Delete a single existing portion
router.delete('/portions/:id', requireUser, deletePortion);

// Delete multiple existing portions
router.patch('/delete-portions', requireUser, deleteMultiplePortions);

module.exports = router;