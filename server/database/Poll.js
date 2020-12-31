const pg = require('./connection');
const moment = require('moment');

const Poll = {
  findByAuthor: async (authorId) => {
    console.log('From poll.js line 6', authorId);
    return await pg
      .select('pollID', 'question', 'created', 'expired')
      .from('polls')
      .where('userID', authorId).orderBy('created', 'desc');
  },

  findOne: async (id) => {
    const result = await pg
      .select('pollID', 'question', 'created', 'expired', 'userID')
      .from('polls')
      .where('pollID', id);
    return result[0];
  },

  addNewPoll: async (question, duration, user) => {
    created = moment().toDate();
    expired = moment().add(duration.amount, duration.unit).toDate();
    const result = await pg('polls').insert(
      {
        question,
        userID: user.userID,
        created,
        expired,
      },
      ['pollID']
    );
    return result[0].pollID;
  },

  vote: async (pollId, answerID) => {},
};

module.exports = Poll;
