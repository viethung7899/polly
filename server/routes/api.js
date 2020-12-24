const express = require('express');
const polls = require('../database/polls');

const router = express.Router();

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

// TODO; get all polls or get a poll by ID
router.get('/', async (req, res, next) => {
  const id = req.query.id;
  let result = undefined;
  try {
    if (id) {
      console.log(id);
      result = await polls.findOne(id);
    } else {
      result = await polls.findAll();
    }
    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
});

// TODO: add a new poll
router.post('/', async (req, res, next) => {
  try {
    const result = await polls.addNew(req.body);
    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
