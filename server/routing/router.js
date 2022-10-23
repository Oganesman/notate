const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router()
const usersSchema = require('../mongoDB/users-schema')
const mongoSecret = require('../mongoDB/db')

router.post('/reg', async (req, res) => {
	const { name, email, password } = req.body
	const isSigned = await usersSchema.findOne({ email })
	if (isSigned) {
		res.json({ status: false, msg: "Such user already exists" })
	}
	else {
		let newUser = new usersSchema({
			name,
			email,
			password
		})
		usersSchema.addUser(newUser, (err, user) => {
			if (err)
				res.json({ status: false, msg: "Sorry not correct registration" })
			else
				res.json({ status: true, msg: "Your registartion success" })
		})
	}
})


router.post('/auth', (req, res) => {
	const { email, password } = req.body
	// const user = usersSchema.findOne({email:email})
	// const { _id } = db.collection("users").findOne({email:email})
	// console.log(_id);
	usersSchema.getEmail(email, (err, user) => {
		if (err) throw err
		if (!user)
			return res.json({ status: false, msg: 'User not found' })
		else
			usersSchema.comparePassword(password, user.password, (err, isMatch) => {
				if (err) throw err
				if (isMatch) {
					let token = jwt.sign(user.toJSON(), mongoSecret.secret, {
						expiresIn: 360 * 24
					})
					res.json({
						status: true,
						msg: 'You sign in',
						token: 'JWT' + token,
						user: {
							name: user.name,
							email: user.email,
							password: user.password,
							id: user._id.toString()
						}
					})
				}
				else {
					return res.json({ status: false, msg: 'Password no correct' })
				}
			})
	})
})

router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.send('dashboard')
})


module.exports = router