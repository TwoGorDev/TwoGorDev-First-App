// Imports
const express = require('express');
const router = express.Router();

// Controllers
const { loginUser, signupUser } = require('../controllers/userAuthController');

// Routes
router.post('/login', loginUser);

router.post('/signup', signupUser);

module.exports = router;