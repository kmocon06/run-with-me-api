const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	trainingFor: String,
	weekNumber: Number,
	dayOfTheWeek: String,
	duration: String,
	distance: String,
	workoutCompleted: Boolean,
	createdDate: {
		type: Date,
		default: Date.now
	}
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout