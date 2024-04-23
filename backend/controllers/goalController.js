// Imports
const goalRepo = require('../repos/goalRepo');
const CustomError = require('../utilities/customError');
const { validateGoal } = require('../validators/goalValidator');

const createGoal = async (req, res, next) => {
  try {
    const newGoal = req.body;
    const { id: userId } = req.user;

    validateGoal(newGoal);

    const goal = await goalRepo.insert(newGoal, userId);

    if (!goal) {
      throw new CustomError(404, 'Goal not found');
    }

    res.status(200).json(goal);

  } catch(error) {
    next(error);
  }
};

module.exports = { createGoal };