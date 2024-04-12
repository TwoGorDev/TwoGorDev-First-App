// Imports
const jwt = require("jsonwebtoken");
const CustomError = require('../../utilities/customError');
const userRepo = require('../../repos/userRepo');

const requireUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new CustomError(401, 'Authorization token required');
    }

    const token = authorization.split(" ")[1];

    const id = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new CustomError(401, 'Authorization token has expired or is invalid');
      }

      return decoded.id
    });

    const user = await userRepo.findById(id);

    if (!user) {
      throw new CustomError(401, 'User authorization failed');
    }
    
    req.user = user;

    next();

  } catch (error) {
    next(error);
  };
};

module.exports = { requireUser };