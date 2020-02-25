const express = require('express')
//separate routes from server.js
const router = express.Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')


//register route
//GET /auth/register
router.get('/register', (req, res) => {
	res.send('register get route')
})


//register route
//POST /auth/register
router.post('/register', async (req, res, next) => {
	try {
		//create user and be able to log them in with their email
		//check if email already exists in the database
		const emailAlreadyExists = await User.findOne({
			email: req.body.email
		})


		//if the account does not exist then we are able to create a new user
		//and should give a 401 error
		if(emailAlreadyExists) {
			console.log('email already exists in db')
			console.log(emailAlreadyExists)

			res.status(401).send({
				data: {},
				message: `A user with the email (${req.body.email}) already exists`
			})
			
		//otherwise we are able to create a new user
		} else {

			const password = req.body.password
			//add salt to protect password 
			const salt = bcrypt.genSaltSync(10)
			//create a hashed password 
			const hashedPassword = bcrypt.hashSync(password, salt) 

			const newUser = await User.create(req.body)
			//change the current password to a hashedpassword
			newUser.password = hashedPassword
			//save the new created user 
			await newUser.save()

			//console.log(newUser)
			//console.log(newUser._id)
			//find the new user by their ID 
			const newUserResponse = await User.findById(newUser._id)
			//console.log(newUserResponse)

			//user is currently logged into the session
    		req.session.loggedIn = true
    		//save the ID and email of the user that is logged into session
    		req.session.userId = newUser._id
    		req.session.email = newUser.email

			res.status(201).send({
				data: newUserResponse,
				message: 'User created successfully'
			})
		}


		//if the user already exists then an error should occur
	} catch(err) {
		console.log(err)
		console.log('this is the error')
	}
})



module.exports = router