// Imports
const mealRepo = require('../repos/mealRepo');
const CustomError = require('../utilities/customError');
const { validateMealFormat } = require('../validators/mealValidator');

// Create new meal
const createMeal = async (req, res, next) => {
  try {
    const newMeal = req.body;
    const { id: creatorId } = req.user;

    validateMealFormat(newMeal);

    const meal = await mealRepo.insert(newMeal, creatorId);

    if (!meal) {
      throw new CustomError(500, 'Creating new meal failed');
    }

    res.status(200).json(meal);
  
  } catch(error) {
    next(error);
  }
}

// Delete existing meal
const deleteMeal = async (req, res, next) => {
  try {
    const { id } = req.params;

    const meal = await mealRepo.delete(id);

    if (!meal) {
      throw new CustomError(404, 'Meal not found');
    }
    
    res.status(200).json(meal);

  } catch(error) {
    next(error);
  }
}

module.exports = {
  createMeal,
  deleteMeal
};