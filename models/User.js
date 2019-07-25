const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Recipe = require('./Recipe');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sign_up_date: {
    type: Date,
    default: Date.now,
  },
  recipes: [Recipe.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;