const express = require('express');
const userRepo = require('../repos/user-repo');

const router = express.Router();

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await userRepo.findById(id);

  if (user) {
    res.send(user);
  }
  else {
    res.sendStatus(404);
  }
});