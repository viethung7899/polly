const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../database/User');

const router = express.Router();

// TODO: sign in
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const found = await User.findOneByUsername(username);

    // Not found
    if (!found) {
      res.status(404);
      throw new Error('User not found');
    }

    const {name, hashPassword} = found;

    // Wrong password
    const matched = await bcrypt.compare(password, hashPassword);
    if (!matched) {
      res.status(401);
      throw new Error('Wrong password');
    }

    // Tokenize user
    const token = jwt.sign({ ...found }, process.env.TOKEN_SECRET);
    res.status(200).json({
      name,
      username,
      token,
    });
  } catch (error) {
    next(error);
  }
});

// TODO: register
router.post('/register', async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    const user = await User.findOneByUsername(username);

    // User already existed
    if (user) {
      res.status(409);
      throw new Error('Username is already existed');
    }

    // Save user into database
    const hashPassword = await bcrypt.hash(password, 10);
    const savedUser = await User.createNewUser(name, username, hashPassword);

    // Tokenize user
    const token = jwt.sign({ ...savedUser }, process.env.TOKEN_SECRET);
    res.status(200).json({
      name,
      username,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
