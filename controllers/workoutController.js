const express = require('express')
const router = express.Router()
const Workout = require('../models/workout.js')

//index route
//get all of the workouts
//GET /
router.get('/', async (req, res, next) => {

	res.send('this is where you can get all the workouts')
})


//CREATE route
//POST /workouts
router.post('/new', async (req, res, next) => {
	try {
		const createWorkout = await Workout.create({
			user: req.session.userId,
			trainingFor: req.body.trainingFor,
			weekNumber: req.body.weekNumber,
			dayOfTheWeek: req.body.dayOfTheWeek,
			duration: req.body.duration,
			distance: req.body.distance,
			workoutCompleted: false
		})

		console.log(createWorkout)

		res.status(201).send({
			data: createWorkout,
			message: 'A new workout was created!',
		}) 

	} catch(err) {
		console.log(err);
	}
})





module.exports = router

