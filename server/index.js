const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const apiRoute = require('./routes/api');
const authRoute = require('./routes/auth');

app = express();

mongoose.connect('mongodb://localhost:27017/polly', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Authenticate route
app.use('/auth', authRoute);
// API route
app.use('/api', apiRoute);

// 404 middleware
app.use((req, res, next) => {
  res.status(404);
  next(new Error('Not found'))
})


// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('App running on port', port);
});
