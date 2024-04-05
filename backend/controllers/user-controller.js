const userRepo = require('../repositories/user-repo');

const getUsers = async (req, res) => {
  const users = await userRepo.findAll();

  res.send(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await userRepo.findById(id);

  if (user) {
    delete user.password;
    res.send(user);
  }
  else {
    res.sendStatus(404);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  const user = await userRepo.update(id, username, email, password);

  if (user) {
    delete user.password;
    res.send(user);
  }
  else {
    res.sendStatus(404);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await userRepo.delete(id);

  if (user) {
    delete user.password;
    res.send(user);
  }
  else {
    res.sendStatus(404);
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser
};