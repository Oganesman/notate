const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router()
const usersSchema = require('../mongoDB/users-schema')
const notateSchema = require('../mongoDB/notates-schema')
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

// create notate
router.post('/create/notate', (req, res) => {
	const { title, description, author, background } = req.body;
	const newNotate = new notateSchema({
		title,
		description,
		author,
		background
	})
	notateSchema.newNotate(newNotate, (err, notate) => {
		if (err)
			res.json({ status: false, msg: 'Notate not create' })
		else
			res.json({ status: true, msg: 'Notate success create' })
	})
})

// show notate
router.get('/fetch/notate', async (req, res) => {
	try {
		const _id = req.query
		const data = await notateSchema.find({
			'author': _id
		})
		res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

//update
router.put('/notate/edit', async (req, res) => {
	try {
		const { title, description, id } = req.body
		await notateSchema.updateOne({ _id: id }, {
			$set: {
				title: title,
				description: description
			}
		})
		res.status(200).json('item success updated')
	} catch (err) {
		res.status(500).json(err)
	}
})

// delete
router.delete('/notate/delete', async (req, res) => {
	try {
		const _id = req.query
		await notateSchema.findOneAndDelete({ _id: _id })
		res.status(200).json('item success deleted')
	} catch (err) {
		return res.status(500).json(err)
	}

})


// change background color
router.post('/notate/background', async (req, res) => {
	try {
		const { id, colorNum } = req.body
		await notateSchema.updateOne({ _id: id }, {
			$set: {
				background: colorNum
			}
		})
		return res.status(200).json('Change background color')
	} catch (err) {
		return res.status(500).json(err)
	}
})

//all notates
// router.get('/fetch/notates', async (req, res) => {
// 	try {
// 		const data = await notateSchema.find()
// 		res.json(data)
// 	} catch (err) {
// 		return res.status(500).json(err)
// 	}
// })



module.exports = router