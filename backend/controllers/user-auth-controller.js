// Imports
const userRepo = require('../repos/user-repo');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../utilities/customError');
const validateUser = require('../validators/userValidator');

// Create json web token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Log in a user
const loginUser = async (req, res, next) => {
  try {
    const user = req.body;

    if (!user.username || !user.password) {
      throw new CustomError(500, 'All fields are required');
    }

    const users = await userRepo.findAllUsernamesAndEmails();

    users.filter(userData => 
      userData.username.toLowerCase() === user.username.toLowerCase() 
      ||
      userData.email.toLowerCase() === user.email.toLowerCase()
    )

    const match = await bcrypt.compare(user.password, existingUser.password);

    if (!match) {
      throw new CustomError(404, 'Username or password is incorrect');
    }

    const token = createToken(existingUser.id);

    res.status(200).send(token);

  } catch(error) {
    next(error);
  }
};

// Sign up a user
const signupUser = async (req, res, next) => {
  try {
    const user = req.body;
    
    validateUser(user);

    if (!validator.isEmail(user.email)) {
      throw new CustomError(500, 'Incorrect email format');
    }
    if (!validator.isStrongPassword(user.password)) {
      throw new CustomError(500, 'Password is not strong enough');
    }

    const existingUser = await userRepo.findByUsername(username);
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await userRepo.insert(username, email, hash);

    const token = createToken(newUser.id);

    res.status(200).send(token);

  } catch(error) {
    next(error)
  }
};

module.exports = { loginUser, signupUser };