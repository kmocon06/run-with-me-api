const express = require('express')
const router = express.Router()
const Workout = require('../models/workout.js')

//index route
//get all of the workouts for all users
//GET /
router.get('/', async (req, res, next) => {
	try {
		const workouts = await Workout.find().populate('userId')

		if(req.body._id === req.session.userId)
			res.status(200).send({
				status: 200,
				data: workouts,
				message: 'We can see all of the workouts!'
			})
	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "Unable to get all of the workouts for all users"
		})
	}
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
			status: 201,
			data: createWorkout,
			message: 'A new workout was created!',
		}) 

	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "Unable to create a workout"
		})
	}
})


//UPDATE route 
router.put('/:id', async (req, res, next) => {
	try {

		// if the current user who is logged in is the admin,
		// then they are able to update that race

		const workoutToUpdate = await Workout.findById(req.params.id)
		console.log(workoutToUpdate)

		if(req.session.userId === workoutToUpdate.user.toString()) {

			workoutToUpdate.trainingFor = req.body.trainingFor,
			workoutToUpdate.weekNumber = req.body.weekNumber,
			workoutToUpdate.dayOfTheWeek = req.body.dayOfTheWeek,
			workoutToUpdate.duration = req.body.duration,
			workoutToUpdate.distance = req.body.distance,
			workoutToUpdate.workoutCompleted = true

			const updatedWorkout = await Workout.findByIdAndUpdate(
				req.params.id, workoutToUpdate)

			res.status(200).send({
				status: 200,
				data: updatedWorkout,
				message:`A workout with the id of ${req.params.id} was updated!`
			})
		} else {
			res.status(403).send({
				status: 403,
				error: "You are unable to update this workout",
				message:`A workout with the id of ${req.params.id} cannot be updated`
			})
		}

	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "Unable to update workout"
		})
	}
})





//DESTROY route 
//DELETE /races/id


router.delete('/:id', async (req, res, next) => {
	try {

		// if the current user who is logged in created the workout,
		// then they are able to delete that workout

		const workoutToDelete = await Workout.findById(req.params.id)
		console.log(workoutToDelete)
		console.log(workoutToDelete.user)

		if(req.session.userId === workoutToDelete.user.toString()) {
			const deleteWorkout= await Workout.findByIdAndDelete(req.params.id)
			res.status(200).send({
				status: 200,
				data: deleteWorkout,
				message:`A workout with the id of ${req.params.id} was deleted`
			})
		} else {

			res.status(403).send({
				status: 403,
				error: "You are unable to delete this workout",
				message:`A workout with the id of ${req.params.id} cannot be deleted`
			})
		}

	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "Unable to delete workout"
		})

	}
})





module.exports = router

