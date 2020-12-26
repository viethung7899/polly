const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  answer: { type: String, required: true },
  count: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answers: [answerSchema],
  authorId: {type: String, required: true},
  date: { type: Date, default: Date.now },
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;