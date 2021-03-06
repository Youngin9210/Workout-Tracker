// importing express router and Workout model
const router = require('express').Router();
const Workout = require('../models/Workout');

// getting workout data from Workout model 'last workout' summary
router.get('/workouts', async (req, res) => {
  try {
    // calculating the sum of all exercise durations in workoutData and adding a field (totalDuration) to the Workout model
    const workoutData = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: '$exercises.duration' },
        },
      },
    ]);
    res.json(workoutData);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// getting workout data for graphs on workout dashboard
router.get('/workouts/range', async (req, res) => {
  try {
    const workoutData = await Workout.aggregate([
      // sorting data in from most recent to oldest
      {
        $sort: { day: -1 },
      },
      {
        $limit: 7,
      },
      // adding totalDuration field for each days total workout duration
      {
        $addFields: {
          totalDuration: { $sum: '$exercises.duration' },
        },
      },
      // changing sort direction for graph results
      {
        $sort: { day: 1 },
      },
      // limiting results to 7 entries
    ]);
    console.log(workoutData);
    res.json(workoutData);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
});

// updating workout
router.put('/workouts/:id', async (req, res) => {
  try {
    // finding document and updating based on the id of the req.params
    const workoutData = await Workout.findOneAndUpdate(
      { _id: req.params.id },
      // pushing req.body into the exercises array
      { $push: { exercises: req.body } },
      // returning document after update was applied
      { new: true }
    );

    res.json(workoutData);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// posting new Workout model instance
router.post('/workouts', async (req, res) => {
  try {
    const workoutData = await Workout.create(req.body);
    res.json(workoutData);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
