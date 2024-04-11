// Imports
const CustomError = require('../utilities/customError');

const validateUser = (user) => {
  const { username, email, password } = user;
  
  // Check if all data has been sent
  if (!username || !email || !password) {
    throw new CustomError(500, 'All fields are required');
  }

  // Check character length
  if (username.length > 20) {
    throw new CustomError(500, 'Username cannot be longer than 20 characters');
  }
  if (password.length > 50) {
    throw new CustomError(500, 'Email cannot be longer than 50 characters');
  }
}

module.exports = { validateUser };