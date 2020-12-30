const pg = require('./connection');

const polls = {
  findByAuthor: async (authorId) => {
    console.log('From poll.js line 6', authorId);
    return await pg
      .select('pollID', 'question', 'created', 'expired')
      .from('polls')
      .where('userID', authorId);
  },

  findOne: async (id) => {
    const result = await pg
      .select('pollID', 'question', 'created', 'expired')
      .from('polls')
      .where('pollID', id);
    return result[0];
  },

  addNew: async (question, answers, user, duration) => { },

  vote: async (pollId, answerID) => {},
};

module.exports = polls;
