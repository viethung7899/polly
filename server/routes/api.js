const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Poll = require('../database/Poll');
const Answer = require('../database/Answer');
const Vote = require('../database/Vote');

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

// // Logger after authorization
// router.use(async (req, res, next) => {
//   console.log(req.body);
//   next();
// });

// Cast a vote to a poll
router.post('/vote', async (req, res, next) => {
  const { pollID, answerID, user } = req.body;
  try {
    // Check if the user vote
    const found = await Vote.findVote(pollID, user.userID);
    if (found) {
      res.status(403);
      throw new Error('You only vote once');
    }

    // Cast the vote
    await Answer.addVote(answerID);

    // Add vote record
    const voteID = await Vote.addVote(pollID, user.userID);
    // Return the voteID
    res.status(200).json({ voteID });
  } catch (err) {
    next(err);
  }
});

// Get all polls from the users
router.get('/', async (req, res, next) => {
  try {
    const userId = req.body.user.userID;
    const polls = await Poll.findByAuthor(userId);
    res.status(200).json({ polls });
  } catch (error) {
    res.status(404);
    next(error);
  }
});

// Get one poll by id with full details
router.get('/:id', async (req, res, next) => {
  try {
    const { user } = req.body;
    const id = req.params.id;
    const poll = await Poll.findOne(id);
    const answers = await Answer.getAnswersFromPoll(poll.pollID);
    const voteID = await Vote.findVote(poll.pollID, user.userID);
    res.status(200).json({ ...poll, answers, voted: !!voteID });
  } catch (error) {
    next(error);
  }
});

// Add a new poll
router.post('/', async (req, res, next) => {
  const { question, answers, duration, user } = req.body;
  try {
    // Add poll and question
    const pollID = await Poll.addNewPoll(question, duration, user);
    answers.forEach(async (answer) => {
      await Answer.addAnswer(pollID, answer);
    });
    res.status(200).json({ pollID });
    // Add answers
  } catch (error) {
    next(new Error('Unsucessful'));
  }
});

module.exports = router;
