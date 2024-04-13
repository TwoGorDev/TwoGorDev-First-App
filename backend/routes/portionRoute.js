// Imports
const express = require('express');
const router = express.Router();
const portionRepo = require('../repos/portionRepo');

// Auth middleware
const { requireUser } = require('../middleware/auth/requireUser');
const { requireOwner } = require('../middleware/auth/requireOwner');

// Controllers
const {
  deletePortion,
  createPortion
} = require('../controllers/portionController');

// Routes

// Create new portion
router.post('/portions', requireUser, createPortion);

// Delete existing portion
router.delete('/portions/:id', requireUser, requireOwner(portionRepo), deletePortion);

module.exports = router;