const { findById } = require('../models/User');
const User = require('../models/User');

const users = {
  findOneByUsername: async (username) => {
    return await User.findOne({username: username})
  },

  createNewUser: async (username, hashPassword) => {
    const newUser = new User({username, hashPassword});
    return await newUser.save();
  }
}

module.exports = users;