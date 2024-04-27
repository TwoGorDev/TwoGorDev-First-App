// Imports
const portionRepo = require('../repos/portionRepo');
const mealRepo = require('../repos/mealRepo');
const CustomError = require('../utilities/customError');
const { validatePortion } = require('../validators/portionValidator');

// Controllers
const createPortions = async (req, res, next) => {
  try {
    const newPortions = req.body;
    const { id: userId } = req.user;

    newPortions.forEach(portion => validatePortion(portion));

    const meal = await mealRepo.findById(newPortions[0].meal_id);

    if (!meal) {
      throw new CustomError(404, 'Meal not found');
    }

    if (meal.user_id !== userId) {
      throw new CustomError(401, "You're not authorized to edit this data");
    }

    const portions = await portionRepo.insert(newPortions, userId);

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
    const { id: userId } = req.user;

    const portion = await portionRepo.findById(id);

    if (portion.userId !== userId) {
      throw new CustomError(401, "You're not authorized to edit this data");
    }

    const deletedPortion = await portionRepo.delete(id);

    res.status(200).json(deletedPortion);

  } catch(error) {
    next(error);
  };
};

const deleteMultiplePortions = async (req, res, next) => {
  try {
    const portionsToBeDeleted = req.body;
    const { id: userId } = req.user;

    const portions = await portionRepo.findManyByIds(portionsToBeDeleted);

    if (portions.length === 0) {
      throw new CustomError(404, 'Portions not found');
    }

    const userOwnedPortions = portions.filter(portion => portion.user_id === userId);

    if (userOwnedPortions.length !== portionsToBeDeleted.length) {
      throw new CustomError(401, "You're not authorized to edit this data");
    }

    const deletedPortions = await portionRepo.deleteMany(portionsToBeDeleted);

    res.status(200).json({deletedPortions})

  } catch(error) {
    next(error);
  };
};

module.exports = { deletePortion, createPortions, deleteMultiplePortions };