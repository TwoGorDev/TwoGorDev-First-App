// Imports
const portionRepo = require('../repos/portionRepo');
const mealRepo = require('../repos/mealRepo');
const CustomError = require('../utilities/customError');
const { validatePortion } = require('../validators/portionValidator');

// Controllers
const createPortion = async (req, res, next) => {
  try {
    const newPortion = req.body;
    const { id: creatorId } = req.user;

    validatePortion(newPortion);

    const meal = await mealRepo.findById(newPortion.mealId);

    if (!meal) {
      throw new CustomError(404, 'Meal not found');
    }

    if (meal.user_id !== creatorId) {
      throw new CustomError(401, "You're not authorized to edit this data");
    }

    const portion = await portionRepo.insert(newPortion, creatorId);

    if (!portion) {
      throw new CustomError(404, 'Creating new portion failed');
    }

    res.status(200).json(portion);

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