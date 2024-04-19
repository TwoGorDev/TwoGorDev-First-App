// Imports
const dailySummaryRepo = require('../repos/dailySummaryRepo');
const CustomError = require('../utilities/customError');
const { dateRegEx } = require('../utilities/dataFormatRegEx');

// Get a single summary
const getSummary = async (req, res, next) => {
  try {
    const { date } = req.params;
    const { id: userId } = req.user;

    if (!date.match(dateRegEx)) {
      throw new CustomError(500, 'Invalid date format');
    }

    const dailySummary = await dailySummaryRepo.getDailySummary(date, userId);

    res.status(200).json(dailySummary);

  } catch(error) {
    next(error);
  }
}

module.exports = { getSummary };