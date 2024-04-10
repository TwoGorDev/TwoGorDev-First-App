// Imports
const userRepo = require('../repos/user-repo');
const CustomError = require('../utilities/customError');
const validateUser = require('../validators/userValidator');

// Get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await userRepo.findAll();

    res.status(200).send(users);

  } catch(error) {
    next(error);
  }
};

// Get a single user
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new CustomError(500, 'User id required');
    }

    const user = await userRepo.findById(id);

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    delete user.password;
    res.status(200).send(user);

  } catch(error) {
    next(error);
  }
};

// Update an existing user
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;

    if (!id) {
      throw new CustomError(500, 'User id required');
    }

    validateUser(updatedUser);

    const user = await userRepo.update(id, updatedUser);

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    delete user.password;
    res.status(200).send(user);

  } catch(error) {
    next(error);
  }
};

// Delete an existing user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new CustomError(500, 'User id required');
    }

    const user = await userRepo.delete(id);

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    delete user.password;
    res.status(200).send(user);

  } catch(error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};