// Imports
const CustomError = require("../utilities/customError");

const validatePortion = (portion) => {
  const { mealId, productId, serving } = portion;

  if (!mealId || !productId || !serving) {
    throw new CustomError(505, 'All fields required');
  };
};

module.exports = { validatePortion };