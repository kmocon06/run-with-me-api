const express = require('express')
//separate routes from server.js
const router = express.Router()
const User = require('../models/user.js')


//register route
//GET /auth/register
router.get('/register', (req, res) => {
	res.send('register get route')
})


//register route
//POST /auth/register
router.post('/register', async (req, res, next) => {
	const body = req.body

	console.log(body);
	res.send('register post route')
})



module.exports = router