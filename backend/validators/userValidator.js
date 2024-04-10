// Imports
const CustomError = require('../utilities/customError');

const validateUser = (user) => {
  const { username, email, password } = user;
  
  // Check if all data has been sent
  if (!username || !email || !password) {
    throw new CustomError(500, 'All fields are required');
  }
}

module.exports = { validateUser };