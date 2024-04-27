// Imports
const CustomError = require("../utilities/customError");

const validatePortion = (portion) => {
  const { meal_id, product_id, serving } = portion;

  if (!meal_id || !product_id || !serving) {
    throw new CustomError(505, 'All fields required');
  };
};

module.exports = { validatePortion };