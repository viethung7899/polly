const express = require('express');
const polls = require('../database/polls');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// Authorize middleware
router.use(async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401);
      throw new Error('Not allowed');
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
      if (error) {
        res.status(403);
        throw new Error('Not authorized');
      } else {
        req.body['user'] = payload;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
});

// Logger after authorization
router.use(async (req, res, next) => {
  console.log(req.body);
  next();
});

router.post('/vote', async (req, res, next) => {});

router.get('/', async (req, res, next) => {
  try {
    const userId = req.body.user.userID;
    const result = await polls.findByAuthor(userId);
    res.json({
      result,
    });
  } catch (error) {
    next(new Error('Not found'));
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await polls.findOne(id);
    res.json({
      result,
    });
  } catch (error) {
    next(new Error('Not found'));
  }
});

// TODO: add a new poll
router.post('/', async (req, res, next) => {});

module.exports = router;
