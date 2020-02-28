const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	trainingFor: {
		type: String,
		required: true
	},
	weekNumber: {
		type: Number,
		required: true
	},
	dayOfTheWeek: {
		type: String,
		required: true
	},
	duration: {
		type: String,
		required: true
	},
	distance: {
		type: String,
		required: true
	},
	workoutCompleted: Boolean,
	createdDate: {
		type: Date,
		default: Date.now
	}
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout