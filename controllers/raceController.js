const express = require('express')
const router = express.Router()
const Race = require('../models/race.js')



//index
//get all of the races
//GET /races
router.get('/', async (req, res, next) => {
	try {
		const races = await Race.find()

		res.status(200).send({
			status: 200,
			data: races,
			message: "We can see all of the races!"
		})
	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "You are unable to see all of the races"
		})
	}
})


//get race by ID
//get one race
//GET /races/:id
//get once race with the id
router.get('/:id', async (req, res, next) => {
	try {
		//if a user who is logged in and wants to look at a specific race
		if(req.session.userId) {
			const oneRace = await Race.findById(req.params.id)
			//console.log(oneRace)

			res.status(200).send({
				status: 200,
				data: oneRace,
				message: `We can see the ${oneRace.name} race with id ${oneRace._id}`
			})
		} else {
			res.status(401).send({
				status: 401,
				error: "You must we logged in to do that",
				message: `"Unable to get race with ${oneRace._id}`
			})
		}

	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "Unable to find that specific race"
		})
	}
})


//update one race
//PUT /races/:id
//update the race by putting the runners into the runners array 
//of the specific race
router.put('/:id', async (req, res, next) => {
	try {
		if(req.session.userId) {
			const oneRace = await Race.findById(req.params.id)
			//console.log(oneRace)
			//console.log(req.session.name)
			//console.log(req.session.userId)
			//console.log(req.session)
			//console.log(oneRace.runners)


		//if a user who is logged in wants to join the race 
		//then they should be pushed into the runners array
		//for that race
			console.log(oneRace.runners.indexOf('this'))
			//if the name of the user who is logged in is not already in the
			//array (if their index is -1), then they should be pushed
			//into the array of runners
			if(oneRace.runners.indexOf(req.session.name) === -1) {
				oneRace.runners.push(req.session.name)
				oneRace.save()	
			}

			res.status(200).send({
				status: 200,
				data: oneRace,
				message: `We can see the ${oneRace.name} race with id ${oneRace._id}`
			})
		} else {
			res.status(401).send({
				status: 401,
				error: "You must we logged in to do that",
				message: "Unable to update race with new runner"
			})
		}

	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "Unable to update race with a new runner"
		})
	}
})


//CREATE route
//POST /races 
router.post('/new', async (req, res, next) => {
	try {
		const createRace = await Race.create({
			admin: req.session.userId,
			name: req.body.name,
			distance: req.body.distance,
			location: req.body.location,
			date: req.body.date,
			runners: []
		})

		console.log(createRace)

		//if a user has signed up for the race then 
		//push the runner into the runners array

		res.status(201).send({
			status: 201,
			data: createRace,
			message: "A new race was created!",
		}) 

	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "Unable to create a new race",
		}) 
	}
})



//UPDATE route 
router.put('/:id', async (req, res, next) => {
	try {

		// if the current user who is logged in is the admin,
		// then they are able to update that race

		const raceToUpdate = await Race.findById(req.params.id)
		console.log(raceToUpdate)
		//const raceToUpdate = {}

		if(req.session.userId === raceToUpdate.admin.toString()) {


			raceToUpdate.name = req.body.name
			raceToUpdate.distance = req.body.distance
			raceToUpdate.location = req.body.location
			raceToUpdate.date = req.body.date

			const updatedRace = await Race.findByIdAndUpdate(
				req.params.id, raceToUpdate)

			res.status(200).send({
				status: 200,
				data: updatedRace,
				message:"A race with the id of ${req.params.id} was updated!"
			})
		} else {
			res.status(403).send({
				status: 403,
				error: "You are unable to update this race",
				message:"This race cannot be updated"
			})
		}

	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "Unable to update race"
		})
	}
})




//DESTROY route 
//DELETE /races/id


router.delete('/:id', async (req, res, next) => {
	try {

		// if the current user who is logged in is the admin,
		// then they are able to delete that race
		// raceToDelete = GET THE RACE

		const raceToDelete = await Race.findById(req.params.id)

		if(req.session.userId === raceToDelete.admin.toString()) {
			const deleteRace = await Race.findByIdAndDelete(req.params.id)
			res.status(200).send({
				status: 200,
				data: deleteRace,
				message:`A race with the id of ${req.params.id} was deleted`
			})
		} else {
			res.status(403).send({
				status: 403,
				error: "You are unable to delete this race",
				message:`This race cannot be deleted`
			})
		}

	} catch(err) {
		console.log(err)

		res.status(403).send({
			status: 403,
			error: "ERROR",
			message:"Unable to delete race"
		})
	}
})





module.exports = router
