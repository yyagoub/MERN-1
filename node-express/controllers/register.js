const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../services/User');

// post a new user
router.post('/', async (req, res) => {
  // validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(422).send(error.details[0].message);
  // check if username is already in the database
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(422).send('username already exists');
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // if data valid then save the user
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  // respond with saved user
  await user
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

module.exports = router;
