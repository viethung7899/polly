const pg = require('./connection');

const users = {
  findOneByUsername: async (username) => {
    return await pg.select().from('users').where('username', username);
  },

  createNewUser: async (name, username, hashPassword) => {
    return await pg('users').insert({ name, username, hashPassword });
  },
};

module.exports = users;
