const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter the name of the workout',
  },
  type: {
    type: String,
    trim: true,
    required: 'Please select the type of workout',
  },
  duration: {
    type: Number,
    required: 'Please enter the duration of your workout',
  },
  weight: {
    type: Number,
  },
  sets: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  distance: {
    type: Number,
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
