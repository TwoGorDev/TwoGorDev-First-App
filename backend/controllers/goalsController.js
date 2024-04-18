// Imports
const goalsRepo = require('../repos/goalsRepo');
const CustomError = require('../utilities/customError');
const { dateRegEx } = require('../utilities/dataFormatRegEx');

// Get a single goal
const getGoal = async (req, res, next) => {
  try {
    const { date } = req.params;
    const { id: userId } = req.user;
    console.log('GOAL REQUEST RECIEVED')

    if (!date.match(dateRegEx)) {
      throw new CustomError(500, 'Invalid date format');
    }

    const goal = await goalsRepo.findByDate(date, userId);

    res.status(200).json(goal);

  } catch(error) {
    next(error);
  }
};

module.exports = { getGoal };