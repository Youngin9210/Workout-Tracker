const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
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
    },
  ],
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
