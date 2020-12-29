const moment = require('moment');
const Poll = require('../models/Poll');

const polls = {
  findByAuthor: async (authorId) =>
    await Poll.find({ authorId }).sort({ created: -1 }).exec(),

  findOne: async (id) => await Poll.findById(id).exec(),

  addNew: async (question, answers, user, duration) => {
    const newPoll = new Poll({
      question,
      authorId: user._id,
      answers: [],
      created: moment().toDate(),
      expired: moment().add(+duration.amount, duration.unit).toDate(),
    });
    answers.forEach((answer) => {
      newPoll.answers.push({ answer });
    });
    return await newPoll.save();
  },

  vote: async (pollId, answerID) => {
    const poll = await Poll.findById(pollId).exec();
    poll.answers[answerID].count++;
    return await poll.save();
  },
};

module.exports = polls;
