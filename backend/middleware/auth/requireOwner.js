// Imports
const CustomError = require("../../utilities/customError");
const mealRepo = require('../../repos/mealRepo');

const requireOwner = (repository) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const { id: creatorId } = req.user;

      const data = await repository.findById(id);

      if (!data) {
        throw new CustomError(404, 'Data not found');
      }

      if (data.user_id !== creatorId) {
        throw new CustomError(401, "You're not authorized to edit this data");
      }
      
      next();

    } catch(error) {
      next(error);
    }
  }
}

module.exports = { requireOwner };