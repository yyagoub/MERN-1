const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../services/User');

// patch user's username
router.patch('/', async (req, res) => {
  if (!req.user._id || !req.body) {
    res.status(422).send('empty body!');
  }
  const user = req.body;
  const id = req.user._id;
  // validate the data
  const { error } = registerValidation(user);
  if (error) return res.status(422).send(error.details[0].message);
  // hash the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send('error');
  }
});

// delete user
router.delete('/', async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    res.status(500).send('error');
  } else {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      res.status(200).send(deletedUser);
    } catch (error) {
      res.status(500).send('error');
    }
  }
});

module.exports = router;
