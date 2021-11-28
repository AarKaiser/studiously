const { User, Goal } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      } else {
        throw new AuthenticationError('Error!Please login!');
      }
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email!');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials!');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    saveGoal: async (parent, { goalData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedGoals: goalData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    setCompletedGoal: async (parent, { goalId, completed }, context) => {
      if (context.user) {
        // Find user
        const userData = await User.findById(context.user._id).lean();
        // Find target goal
        const targetGoal = userData.savedGoals.find((goal) => {
          return String(goal._id) === String(goalId);
        });
        // Construct updated goal
        let value;
        if (completed === 'yes') value = true;
        if (completed === 'no') value = false;
        if (completed === 'reset') value = null;

        const updatedGoal = { ...targetGoal, completed: value };
        // Get index of target goal
        const indexOfTargetGoal = userData.savedGoals.findIndex(
          (goal) => String(goal._id) === String(goalId)
        );

        // Replace target goal with updated goal
        const updatedGoals = userData.savedGoals;
        updatedGoals[indexOfTargetGoal] = updatedGoal;

        // Update the user's goal
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { savedGoals: updatedGoals },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeGoal: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedGoals: { _id: args.goalId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('Please login to remove a goal!');
    },
  },
};

module.exports = resolvers;
