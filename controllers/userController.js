const express = require('express')
const router = express.Router()
const Workout = require('../models/workout.js')
const User = require('../models/user.js')

// GET /users/:userId/workouts -- lists all the workouts for one user
router.get('/:userId/workouts', async (req, res, next) => {
  	console.log('user workout route');
	try {
		const workoutsForThisUser = await Workout.find({
  			user: req.params.userId})

  		const user = await User.findById(req.params.userId)

  	console.log(workoutsForThisUser)
  	console.log(user)
  		res.status(200).send({
  			status: 200,
			data: workoutsForThisUser,
			message: "We can see all of the workouts for the user!"
		})
	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "Unable to get user's workouts"
		})
	}
})

// GET /users/:userId/workouts -- lists one workout for one user
router.get('/:userId/workouts/:id', async (req, res, next) => {
  // const workoutsForThisUser = await Workout.find({
  // 	user: req.params.userId}).populate('workouts')
  // 	const user = await User.findById(req.params.userId)
	try {
		const oneUserWorkout = await Workout.findById(req.params.id)
  		console.log(oneUserWorkout)

  		res.status(200).send({
  			status: 200,
			data: oneUserWorkout,
			message: `We can see the specific workout with id of ${req.params.id} for the user!`
		})
	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "Unable to get one workout for one user"
		})
	}

})



module.exports = router