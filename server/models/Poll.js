const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/polly', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const answerSchema = new mongoose.Schema({
  answer: { type: String, required: true },
  count: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answers: [answerSchema],
  date: { type: Date, default: Date.now },
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;