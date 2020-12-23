const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const apiRoute = require('./routes/api');

app = express();

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// API router
app.use('/api', apiRoute);


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
