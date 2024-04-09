const userRepo = require('../repos/user-repo');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({error: 'All fields are required'});
  }

  const user = await userRepo.findByUsername(username);

  if (!user) {
    res.status(400).send({error: 'Username or password is incorrect'});
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.status(400).send({error: 'Username or password is incorrect'});
  }

  const token = createToken(user.id);

  res.status(200).send({token});
};

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).send({error: 'All fields are required'});
  }
  if (!validator.isEmail(email)) {
    res.status(400).send({error: 'Incorrect email format'});
  }
  if (!validator.isStrongPassword(password)) {
    res.status(400).send({error: 'Password is not strong enough'});
  }

  const existingUser = await userRepo.findByUsername(username);

  if (existingUser) {
    if (existingUser.email.toLowerCase() === email.toLowerCase()) {
      res.status(400).send({error: 'Account with this email already exists'});
    }
    if (existingUser.username.toLowerCase() === username.toLowerCase()) {
      res.status(400).send({error: 'This username is taken'});
    }
  }
  
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const newUser = await userRepo.insert(username, email, hash);

  const token = createToken(newUser.id);

  res.status(200).send({token});
};

module.exports = { loginUser, signupUser };