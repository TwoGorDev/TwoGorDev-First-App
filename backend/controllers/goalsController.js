// Imports
const goalsRepo = require('../repos/goalsRepo');
const CustomError = require('../utilities/customError');
const { dateRegEx } = require('../utilities/dataFormatRegEx');
const { validateGoal } = require('../validators/goalValidator');

// Get a single goal
const getGoal = async (req, res, next) => {
  try {
    const { date } = req.params;
    const { id: userId } = req.user;

    if (!date.match(dateRegEx)) {
      throw new CustomError(500, 'Invalid date format');
    }

    const goal = await goalsRepo.findByDate(date, userId);

    res.status(200).json(goal);

  } catch(error) {
    next(error);
  }
};

const createGoal = async (req, res, next) => {
  try {
    const newGoal = req.body;
    const { id: userId } = req.user;

    validateGoal(newGoal);

    const goal = await goalsRepo.insert(goal, userId);

    if (!goal) {
      throw new CustomError(404, 'Goal not found');
    }

    res.status(200).json(goal);

  } catch(error) {
    next(error);
  }
};

module.exports = { getGoal, createGoal };