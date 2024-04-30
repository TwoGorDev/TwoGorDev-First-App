// Imports
const userRepo = require('../repos/userRepo');
const CustomError = require('../utilities/customError');
const imageRepo = require('../repos/imageRepo');

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
    res.status(200).json(user);

  } catch(error) {
    next(error);
  }
};

// Update existing user
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = req.body;
    const { id: userId } = req.user;

    if (updatedUser.avatarString) {
      const url = await imageRepo.uploadNewImage(updatedUser.avatarString, userId);
      updatedUser.avatar_url = url;
    }

    const user = await userRepo.update(updatedUser, userId);

    if (!user) {
      throw new CustomError(500, 'User update failed');
    }

    delete user.password;

    res.status(200).json(user);

  } catch(error) {
    next(error);
  }
};

// Delete existing user
const deleteUser = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    
    await imageRepo.deleteOldImage(userId);
    const user = await userRepo.delete(userId);
    

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    delete user.password;
    res.status(200).json(user);

  } catch(error) {
    next(error);
  }
};

module.exports = {
  getUserById,
  updateUser,
  deleteUser
};