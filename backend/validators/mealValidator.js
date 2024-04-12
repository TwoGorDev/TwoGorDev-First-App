// Imports
const CustomError = require('../utilities/customError');

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;

const validateMealFormat = (meal) => {
  const { type, date } = meal;

  if (!type || !date) {
    throw new CustomError(500, 'All data is required');
  }

  if (!MEAL_TYPES.includes(type)) {
    throw new CustomError(500, 'Incorrect meal type');
  }

  if (!date.match(dateRegEx)) {
    throw new CustomError(500, 'Incorrect meal date format');
  }
};

module.exports = { validateMealFormat };