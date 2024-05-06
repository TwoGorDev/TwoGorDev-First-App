// Imports
const userRepo = require('../repos/userRepo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../utilities/customError');
const { validatePassword, validateEmail, validateUsername } = require('../validators/userValidator');

// Login a user
const loginUser = async (req, res, next) => {
  try {
    const user = req.body;

    if (!user.username || !user.password) {
      throw new CustomError(500, 'All fields are required');
    }

    // Find user in the database
    const existingUser = await userRepo.findByUsername(user.username);

    if (!existingUser) {
      throw new CustomError(404, 'Username or password is incorrect');
    }

    // Compare password hashes
    const match = await bcrypt.compare(user.password, existingUser.password);

    if (!match) {
      throw new CustomError(404, 'Username or password is incorrect');
    }

    // Send back jwt upon successful login
    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    delete existingUser.password
    delete existingUser.id

    res.status(200).json({ ...existingUser, token });

  } catch(error) {
    next(error);
  }
};

// Signup a user
const signupUser = async (req, res, next) => {
  try {
    const user = req.body;
    
    // Check if user data format is correct
    validateUsername(user.username);
    validateEmail(user.email);
    validatePassword(user.password);

    // Check if an account with provided username/email already exists
    const existingUsername = await userRepo.findByUsername(user.username.trim());
    const existingEmail = await userRepo.findByEmail(user.email);

    if (existingUsername) {
      throw new CustomError(500, 'This username is already taken');
    }
    if (existingEmail) {
      throw new CustomError(500, 'An account with this email address already exists');
    }
    
    // Hash user password and add him to the database
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    const newUser = {
      username : user.username,
      email: user.email,
      password: hash
    }
    
    const createdUser = await userRepo.insert(newUser);

    // Send back jwt upon successful signup
    const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    delete createdUser.password
    delete createdUser.id

    res.status(200).json({ ...createdUser, token });

  } catch(error) {
    next(error);
  }
};

module.exports = { loginUser, signupUser };