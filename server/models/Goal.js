const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedGoals` array in User.js
const goalSchema = new Schema({
  description: {
    type: String,
    required: [true, 'A goal must have a description'],
  },
  // saved goal id from GoogleGoals

  name: {
    type: String,
    required: [true, 'A goal must have a name!'],
  },
  userId: {
    type: String,
    required: [true, 'A goal must be associated to a user!'],
  },
});

module.exports = goalSchema;
