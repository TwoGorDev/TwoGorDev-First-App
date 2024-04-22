// Imports
const portionRepo = require('../repos/portionRepo');
const mealRepo = require('../repos/mealRepo');
const CustomError = require('../utilities/customError');
const { validatePortion } = require('../validators/portionValidator');

// Controllers
const createPortion = async (req, res, next) => {
  try {
    const newPortions = req.body;
    const { id: userId } = req.user;

    newPortions.forEach(portion => validatePortion(portion));

    const meal = await mealRepo.findById(newPortions[0].mealId);

    if (!meal) {
      throw new CustomError(404, 'Meal not found');
    }

    if (meal.user_id !== userId) {
      throw new CustomError(401, "You're not authorized to edit this data");
    }

    const portions = await Promise.all(newPortions.map(async (portion) => await portionRepo.insert(portion, userId)));

    if (portions.length === 0) {
      throw new CustomError(404, 'Creating new portion failed');
    }
    
    res.status(200).json({ portions });

  } catch(error) {
    next(error);
  };
};

const deletePortion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const portion = await portionRepo.delete(id);

    if (!portion) {
      throw new CustomError(404, 'Portion not found');
    }

    res.status(200).json(portion);

  } catch(error) {
    next(error);
  };
};

module.exports = { deletePortion, createPortion };