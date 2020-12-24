const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const users = require('../database/users');

const router = express.Router();

// TODO: sign in
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await users.findOneByUsername(username);
    console.log(user);

    // Not found
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Wrong password
    const matched = await bcrypt.compare(password, user.hashPassword);
    if (!matched) {
      res.status(401);
      throw new Error('Wrong password');
    }

    // Tokenize user
    const token = jwt.sign({ ...user }, process.env.TOKEN_SECRET);
    res.json({
      username,
      token,
    });
  } catch (error) {
    next(error);
  }
});

// TODO: sign out
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await users.findOneByUsername(username);
    console.log(user);

    // User already existed
    if (user) {
      res.status(409);
      throw new Error('Username is already existed');
    }

    // Save user into database
    const hashPassword = await bcrypt.hash(password, 10);
    const savedUser = await users.createNewUser(username, hashPassword);
    
    // Tokenize user
    const token = jwt.sign({ ...savedUser }, process.env.TOKEN_SECRET);
    res.json({
      username,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
