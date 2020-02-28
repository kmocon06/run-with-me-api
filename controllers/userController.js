const express = require('express')
const router = express.Router()
const Workout = require('../models/workout.js')
const User = require('../models/user.js')

// GET /users/:userId/workouts -- lists all the workouts for one user
router.get('/:userId/workouts', async (req, res, next) => {
  const workoutsForThisUser = await Workout.find({user: req.params.userId})
  // you could also get this information with populate('owner') on the
  // prev query
  	const user = await User.findById(req.params.userId)


  	console.log(workoutsForThisUser)
  	console.log(user)
  	res.status(200).send({
		data: workoutsForThisUser,
		message: 'We can see all of the workouts for the user!'
	})
})



module.exports = router