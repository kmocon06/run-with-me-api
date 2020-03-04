//require dotenv to load environment variables
require('dotenv').config()
const express = require('express')
//require cors to connect to frontend (run-with-me-react)
const cors = require('cors')
const app = express()
const PORT = process.env.PORT
//Parse incoming request bodies in a middleware before your handlers, 
//available under the req.body property with body-parser
const bodyParser = require('body-parser')
//be able to store sessions for each user
const session = require('express-session')
const methodOverride = require('method-override')
//db connection
require('./db/db')


//MIDDLEWARE

//allow Cross-origin resource sharing
//in this case to connect to React app
app.use(cors({
	origin: [process.env.REACT_APP, 'https://run-with-me-app.herokuapp.com'],
	credentials: true,
	optionsSuccessStatus: 200
}));
//body-parser
//convert data to JSON format
app.use(bodyParser.json())
app.use(methodOverride('_method'))
//express-sessions
//this makes req.sessions accessible 
app.use(session({
	//scramble session info so someone is unable 
	//to breach system and access session data
	secret: process.env.SESSION_SECRET,
	resave: false, 
  	saveUninitialized: false 
}))



//CONTROLLERS
const authController = require('./controllers/authController.js')
const raceController = require('./controllers/raceController.js')
const workoutController = require('./controllers/workoutController.js')
const userController = require('./controllers/userController.js')

//ROUTES
app.get('/', (req, res) => {
  res.send('RUN WITH ME PROJECT')
})


//API version 1
app.use('/api/v1/auth', authController)
app.use('/api/v1/races', raceController)
app.use('/api/v1/workouts', workoutController)
app.use('/api/v1/', userController)



//LISTENERS
// app.listen(PORT, () => {
//   const currentDate = new Date()
//   console.log(`${currentDate.toLocaleString()}: Server listening on port ${PORT}`)
// })

app.listen(process.env.PORT || 4000)