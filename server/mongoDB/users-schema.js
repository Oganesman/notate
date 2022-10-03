const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	}
})

const User = module.exports = mongoose.model('User', UserSchema)

// module.exports.getLogin = function (login, cb) {
// 	const userLogin = { login: login }
// 	User.findOne(userLogin, cb)
// }

module.exports.getEmail = function (email, cb) {
	const userEmail = { email: email }
	User.findOne(userEmail,cb)
}

module.exports.getId = function (id, cb) {
	User.findById(id, cb)
}

module.exports.addUser = function (newUser, cb) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			if (err) throw err
			newUser.password = hash
			newUser.save(cb)
		});
	});
}

module.exports.comparePassword = function (password, passwordDB, cb) {
	bcrypt.compare(password, passwordDB, (err, isMatch) => {
		if (err) throw err
		cb(null, isMatch)
	})
}

