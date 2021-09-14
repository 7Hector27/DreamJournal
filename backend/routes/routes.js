const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware');
const path = require('path');
const saltRounds = 10;
const fs = require('fs');
const User = require('../schema/userSchema');

router.post('/user', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  existingUser &&
    res.json({ msg: 'Email used already has an Account' }).status(400);
  if (!existingUser) {
    const hash = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, hash);
    try {
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      user.save();
      res.send('added user');
    } catch (err) {
      console.log(err);
    }
  }
});

router.post('/user/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  !user && res.json({ msg: 'Unauthorized' }).status(400);
  const match = await bcrypt.compare(password, user.password);
  !match && res.json({ msg: 'Unauthorized' }).status(400);
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('x-auth-token', token).json({ token: token });

  res.send('logged in');

  res.send(err).status(400);
});

router.get('/user', authMiddleware, async (req, res) => {
  try {
    const _id = req.user._id;
    const user = await User.findById({ _id });
    !user && res.json({ msg: 'Unauthorized' }).status(400);
    res.send(user);
  } catch (err) {
    res.send(err).status(400);
  }
});

router.get('/users', async (req, res) => {
  try {
    const a = await User.find();
    res.send(a);
  } catch (err) {
    res.send(err).status(400);
  }
});

module.exports = router;
