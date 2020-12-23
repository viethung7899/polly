const Poll = require('../models/Poll');

const polls = {
  findAll: async () => await Poll.find().exec(),

  findOne: async (pollId) => await Poll.findById(pollId).exec(),

  addNew: async (poll) => {
    const newPoll = new Poll({
      question: poll.question,
      answers: [],
    });
    poll.answers.forEach(answer => {
      newPoll.answers.push({answer: answer})
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