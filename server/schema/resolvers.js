const User = require('../models/user');

module.exports = {
    users: async () => {
        try {
          const users = await User.find();
          return users;
        } catch (err) {
          throw err;
        }
      },
      user: async ({ _id }) => {
        try {
          const user = await User.findById(_id);
          return user;
        } catch (err) {
          throw err;
        }
      },
      createUser: async ({ userInput }) => {
        try {
          const user = new User({
            username: userInput.username,
            email: userInput.email,
            password: userInput.password,
          });
          const result = await user.save();
          return result;
        } catch (err) {
          throw err;
        }
      },
    };