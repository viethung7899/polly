const pg = require('./connection');

const User = {
  findOneByUsername: async (username) => {
    const result = await pg('users').where('username', username);
    console.log(result);
    return result[0];
  },

  createNewUser: async (name, username, hashPassword) => {
    const result = await pg('users').insert({ name, username, hashPassword }, [
      'userID',
      'username',
      'hashPassword',
    ]);
    return result[0];
  },
};

module.exports = User;
