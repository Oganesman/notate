const mongoose = require('mongoose')

const NotatesSchema = mongoose.Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	author: {
		type: String
	},
})

const Notate = module.exports = mongoose.model('Notate', NotatesSchema)

module.exports.newNotate = function (newNotate, cb) {
	newNotate.save(cb)
}