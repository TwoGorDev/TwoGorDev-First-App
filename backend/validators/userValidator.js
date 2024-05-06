// Imports
const CustomError = require('../utilities/customError');
const validator = require('validator');

const validatePassword = (password) => {
  if (!password) {
    throw new CustomError(500, 'All fields are required');
  }
  if (password.length < 8 || password.length > 128) {
    throw new CustomError(500, 'Password should contain between 8 and 128 characters');
  }

  if (!validator.isStrongPassword(password)) {
    throw new CustomError(500, 'Password is not strong enough');
  }
}

const validateEmail = (email) => {
  if (!email) {
    throw new CustomError(500, 'All fields are required');
  }
  if (/\s/.test(email)) {
    throw new CustomError(500, 'Email cannot contain spaces');
  }
  if (email.length > 255) {
    throw new CustomError(500, 'Email cannot be longer than 255 characters');
  }
  if (!validator.isEmail(email)) {
    throw new CustomError(500, 'Incorrect email format');
  }
}

const validateUsername = (username) => {
  if (!username) {
    throw new CustomError(500, 'All fields are required');
  }
  if (/\s/.test(username)) {
    throw new CustomError(500, 'Username cannot contain spaces');
  }
  if (username.length < 3 || username.length > 16) {
    throw new CustomError(500, 'Username should contain between 3 and 16 characters');
  }
}
module.exports = { validatePassword, validateEmail, validateUsername };