const pg = require('./connection');

const Answer = {
  getAnswersFromPoll: async (pollID) => {
    return await pg
      .select('answerID', 'answer', 'count')
      .from('answers')
      .where('pollID', pollID);
  },

  addAnswer: async (pollID, answer) => {
    return await pg('answers').insert({ pollID, answer });
  },

  addVote: async (answerID) => {
    return await pg('answers').where({ answerID }).increment({ count: 1 });
  },
};

module.exports = Answer;
