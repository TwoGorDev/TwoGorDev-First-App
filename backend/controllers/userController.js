// Imports
const CustomError = require('../utilities/customError');
const userRepo = require('../repos/userRepo');
const imageRepo = require('../repos/imageRepo');
const bcrypt = require('bcrypt');
const { validatePassword, validateUsername } = require('../validators/userValidator');

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
    const newValues = req.body;
    const { id: userId } = req.user;

    const user = await userRepo.findById(userId);

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    // If there's a 'avatarString' property in request body - update user avatar
    if (newValues.avatarString) {
      const url = await imageRepo.uploadNewImage(newValues.avatarString, userId);
      newValues.avatar_url = url;
    }

    // If there's a 'newPassword' property in request body - validate credentials and update user password
    if (newValues.newPassword) {
      const match = await bcrypt.compare(newValues.password, user.password);

      if (!match) {
        throw new CustomError(401, "Incorrect password");
      }

      validatePassword(newValues.newPassword)

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newValues.newPassword, salt);

      newValues.password = hash;
    }

    // If there's a 'username' property in request body - validate it and check if it already exists
    if (newValues.username) {
      validateUsername(newValues.username);

      const existingUsername = await userRepo.findByUsername(newValues.username.trim());

      if (existingUsername) {
        throw new CustomError(500, 'This username is already taken');
      }
    }

    const updatedUser = await userRepo.update(newValues, userId);

    if (!updatedUser) {
      throw new CustomError(500, 'User update failed');
    }

    delete updatedUser.password;
    delete updatedUser.id;

    res.status(200).json(updatedUser);

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