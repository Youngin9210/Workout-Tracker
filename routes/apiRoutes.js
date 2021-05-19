const router = require('express').Router();
const Workout = require('../models/workout');

router.get('/workouts', async (req, res) => {
  Workout.find()
    .sort({ day: -1 })
    .limit(1, (err, data) => {
      err ? console.log(err) : res.json(data);
      console.log(data);
    });
});

router.get('/workouts/range', async (req, res) => {
  Workout.find({}, (err, data) => {
    err ? console.log(err) : res.json(data);
    console.log(data);
  });
});

router.put('/workouts/:id', (req, res) => {
  const exercise = req.body;
  Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        exercises: exercise,
      },
    },
    (err, data) => {
      err ? console.log(err.message) : res.json(data);
    }
  );
});

router.post('/workouts', (req, res) => {
  Workout.create(req.body, (err, data) => {
    err ? console.log(err.message) : res.json(data);
  });
});

module.exports = router;
