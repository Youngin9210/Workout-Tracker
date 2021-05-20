const router = require('express').Router();
const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');

router.get('/workouts', async (req, res) => {
  const workoutData = await Workout.find({}).sort({ day: -1 }).limit(1);
  console.log('--------------- GET /workouts -----------------');
  console.log(workoutData);
  res.json(workoutData);
  // Workout.find({})
  //   .sort({ day: -1 })
  //   .limit(1, (err, data) => {
  //     err ? console.log(err) : res.json(data);
  //     console.log(data);
  //   });
});

router.get('/workouts/range', async (req, res) => {
  try {
    const workoutData = await Workout.find();
    console.log(workoutData);
    res.json(workoutData);
  } catch (err) {
    console.log(err.message);
  }
  // Workout.find({}, (err, data) => {
  //   err ? console.log(err) : res.json(data);
  //   console.log(data);
  // });
});

router.put('/workouts/:id', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const exerciseData = await Exercise.create(data);
    const workoutData = await Workout.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: exerciseData } },
      { new: true }
    );
    console.log('------------ Exercise ------------');
    console.log(exerciseData);
    console.log('------------ Workout ------------');
    console.log(workoutData);
    res.json(workoutData);
  } catch (err) {
    console.log(err.message);
  }
  // const exercise = req.body;
  // Workout.findOneAndUpdate(
  //   { _id: req.params.id },
  //   {
  //     $push: {
  //       exercises: exercise,
  //     },
  //   },
  //   (err, data) => {
  //     err ? console.log(err.message) : res.json(data);
  //   }
  // );
});

router.post('/workouts', async (req, res) => {
  try {
    const workoutData = await Workout.create(req.body);
    // console.log(workoutData);
    res.json(workoutData);
  } catch (err) {
    console.log(err.message);
  }

  // Workout.create(req.body, (err, data) => {
  //   err ? console.log(err.message) : res.json(data);
  // });
});

module.exports = router;
