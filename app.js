//require dotenv to load environment variables
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
//Parse incoming request bodies in a middleware before your handlers, 
//available under the req.body property with body-parser
const bodyParser = require('body-parser')
//be able to store sessions for each user
const session = require('express-session')
//db connection
require('./db/db')


//MIDDLEWARE

//body-parser
app.use(bodyParser.urlencoded({extended: false}))
//express-sessions
//this makes req.sessions accessible 
app.use(session({
	//scramble session info so someone is unable 
	//to breach system and access session data
	secret: process.env.SESSION_SECRET,
	resave: false, 
  	saveUninitialized: false 
}))



//ROUTES
app.get('/', (req, res) => {
  res.send('RUN WITH ME PROJECT')
})


//LISTENERS
app.listen(PORT, () => {
  const currentDate = new Date()
  console.log(`${currentDate.toLocaleString()}: Server listening on port ${PORT}`)
})