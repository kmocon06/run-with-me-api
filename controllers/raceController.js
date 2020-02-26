const express = require('express')
const router = express.Router()
const Race = require('../models/race.js')


//get all of the races
//GET /races
router.get('/', (req, res) => {
	res.send('get races route')
})


//CREATE route
//POST /races 
router.post('/', async (req, res, next) => {
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
			data: createRace,
			message: 'A new race was created!',
		}) 

	} catch(err) {
		console.log(err);
	}
})






module.exports = router
