// importing express, morgan, and mongoose npm packages
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

// setting port
const PORT = process.env.PORT || 3001;

// setting express app
const app = express();

// logging backend data
app.use(logger('dev'));

// express method to recognize incoming req object as a JSON object
app.use(express.json());
// express method to recognize the incoming req object as strings or arrays
app.use(express.urlencoded({ extended: true }));

// serving static files to express app
app.use(express.static('public'));

// connecting to mongodb atlas or local db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  // allowing app to fall back to old parser incase of bug finds
  useNewUrlParser: true,
  // removes connection options that are no longer relevant with new topology engine
  useUnifiedTopology: true,
  // using mongoose default engine build
  useCreateIndex: true,
  // using native findOneAndUpdate()
  useFindAndModify: false,
});

// routes
app.use(require('./routes'));

// starting server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
