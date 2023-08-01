const { User } = require('../models/user');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveLocation: async (parent, { locationData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedLocation: locationData } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeLocation: async (parent, { locationId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedLocation: { locationId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;

// module.exports = {
//     users: async () => {
//         try {
//           const users = await User.find();
//           return users;
//         } catch (err) {
//           throw err;
//         }
//       },
//       user: async ({ _id }) => {
//         try {
//           const user = await User.findById(_id);
//           return user;
//         } catch (err) {
//           throw err;
//         }
//       },
//       createUser: async ({ userInput }) => {
//         try {
//           const user = new User({
//             username: userInput.username,
//             email: userInput.email,
//             password: userInput.password,
//           });
//           const result = await user.save();
//           return result;
//         } catch (err) {
//           throw err;
//         }
//       },
//     };