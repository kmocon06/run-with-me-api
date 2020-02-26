const mongoose = require('mongoose')

const raceSchema = new mongoose.Schema({
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		type: String,
		required: true
	},
	distance: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	runners: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	createdDate: {
		type: Date,
		default: Date.now
	}
})

const Race = mongoose.model('Race', raceSchema)

module.exports = Race