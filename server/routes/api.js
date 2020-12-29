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
        req.body['user'] = payload._doc;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
});

// router.use(async (req, res, next) => {
//   console.log(req.body);
//   next();
// });

// TODO: vote in a poll
router.post('/vote', async (req, res, next) => {
  const { pollID, answerID } = req.body;
  try {
    const result = await polls.vote(pollID, answerID);
    res.status(200).json({
      result: result,
    });
  } catch (error) {
    next(error);
  }
});

// TODO; get all polls from user or get a poll by ID
router.get('/', async (req, res, next) => {
  const id = req.query.id;
  let result = undefined;
  const userId = req.body.user._id;
  try {
    if (id) {
      console.log(id);
      result = await polls.findOne(id);
    } else {
      result = await polls.findByAuthor(userId);
    }
    res.json({
      result,
    });
  } catch (error) {
    next(new Error('Not found'));
  }
});

// TODO: add a new poll
router.post('/', async (req, res, next) => {
  try {
    const { question, answers, user, duration } = req.body;
    const result = await polls.addNew(question, answers, user, duration);
    res.json({
      result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
