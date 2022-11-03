const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true },
  source: { type: String, required: true },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Invalid URL',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Invalid URL',
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    // select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
// first review
