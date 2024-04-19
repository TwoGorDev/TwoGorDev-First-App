// Imports
const CustomError = require("../utilities/customError");

const validateGoal = (goal) => {
  const { calories, proteins, carbohydrates, fats } = goal;

  if (!calories || !proteins || !carbohydrates || !fats) {
    throw new CustomError(505, 'All fields required');
  };
};

module.exports = { validateGoal };