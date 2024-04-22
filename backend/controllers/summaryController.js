// Imports
const progressRepo = require('../repos/progressRepo');
const goalRepo = require('../repos/goalRepo');
const CustomError = require('../utilities/customError');
const { dateRegEx } = require('../utilities/dataFormatRegEx');

// Get a single summary
const getDailySummary = async (req, res, next) => {
  try {
    const { date } = req.params;
    const { id: userId } = req.user;

    if (!date.match(dateRegEx)) {
      throw new CustomError(500, 'Invalid date format');
    }

    const dailyProgress = await progressRepo.findByDate(date, userId);
    const dailyGoal = await goalRepo.findByDate(date, userId);

    res.status(200).json({ dailyProgress, dailyGoal });

  } catch(error) {
    next(error);
  }
}

module.exports = { getDailySummary };