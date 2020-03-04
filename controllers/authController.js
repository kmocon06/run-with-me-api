const express = require('express')
//separate routes from app.js
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
		console.log("hit the register route on the try")
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
				status: 401,
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

			//find the new user by their ID 
			const newUserResponse = await User.findById(newUser._id)

			//user is currently logged into the session
    		req.session.loggedIn = true
    		//save the ID and email of the user that is logged into session
    		req.session.userId = newUser._id
    		req.session.email = newUser.email

			res.status(201).send({
				status: 201,
				data: newUserResponse,
				message: "User created successfully"
			})
		}


		//if the user already exists then an error should occur
	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "Unable to register user"
		})

	}
})

//login route
//POST /login
router.post('/login', async (req, res, next) => {
	try {
		//check if there is a user in the database that exists with that email
		const foundUser = await User.findOne({
			email: req.body.email
		})

		//if a user with that email exists in the database then we need to check if
		//the password input matches the password in the database
		if(foundUser) {

		//if the email and password of user match then user should be logged in
		//if not then the password is no good 
			const loginInfoIsValid = bcrypt.compareSync(req.body.password, foundUser.password)

			if(loginInfoIsValid) {

				const userResponse = await User.findById(foundUser._id)

				req.session.loggedIn = true
				//store current user info when logged into session
				req.session.userId = foundUser._id
    			req.session.email = foundUser.email
    			req.session.name = foundUser.name

    			res.status(200).send({
    				status: 200,
					data: userResponse,
					message: "User successfully logged in"
				})
			} else {

				res.status(401).send({
					status: 401,
					data: {},
					message: "Email or password is invalid"
				})

			}
		} else {
			//if there is no user with this email in the database then 
			//the user needs to register
			res.status(401).send({
				status: 401,
				data: {},
				message: "No user with that email"
			})
		}
	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "Unable to login user"
		})
	}
})

//logout route
//GET /logout

router.get('/logout', async (req, res, next) => {
	//DESTROY session
	try {
		await req.session.destroy()

		res.status(200).send({
			status: 200,
			data: {},
			message: "User successfully logged out"
		})
	} catch(err) {
		console.log(err)

		res.status(401).send({
			status: 401,
			error: "ERROR",
			message: "Unable to logout user"
		})
	}
})






module.exports = router