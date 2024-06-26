// Imports
const CustomError = require('../utilities/customError');

const validateProductFormat = (product) => {
  let { name, calories, proteins, carbohydrates, fats } = product;
  
  // Check if all data has been sent
  if (
    !name ||
    typeof calories === 'undefined' ||
    typeof proteins === 'undefined' ||
    typeof carbohydrates === 'undefined' ||
    typeof fats === 'undefined'
  ) {
    throw new CustomError(500, 'All fields required')
  }

  // Check if calories are between 0 and 900
  if (0 > calories || calories > 900) {
    throw new CustomError(500, 'Calories must be between 0 and 900');
  }

  // Check if nutriens are between 0 and 100
  if (
    0 > proteins || proteins > 100 ||
    0 > carbohydrates || carbohydrates > 100 ||
    0 > fats || fats > 100
  ) {
    throw new CustomError(500, 'Macronutrients must be between 0 and 100');
  };

  let total = +proteins + +carbohydrates + +fats

  // Check if total nutriens value is between 0 and 100
  if (total > 100) {
    throw new CustomError(500, 'Total macronutriens value must be between 0 and 100');
  }
};

module.exports = { validateProductFormat }