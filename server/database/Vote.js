const pg = require('./connection');

const Vote = {
  addVote: async (pollID, userID) => {
    const result = await pg('votes').insert({ pollID, userID }, ['voteID']);
    return result[0];
  },

  findVote: async (pollID, userID) => {
    return await pg('votes').select('voteID').where({pollID, userID});
  }
};

module.exports = Vote;
