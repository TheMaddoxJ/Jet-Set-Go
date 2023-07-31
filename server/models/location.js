const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedLocation` array in User.js
const locationSchema = new Schema({
  name: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  locationId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = locationSchema;
