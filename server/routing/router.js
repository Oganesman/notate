const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router()
const usersSchema = require('../mongoDB/users-schema')
const notateSchema = require('../mongoDB/notates-schema')
const mongoSecret = require('../mongoDB/db')

router.post('/reg', async (req, res) => {
	// let newUser = new usersSchema({
	// 	name: req.body.name,
	// 	email: req.body.email,
	// 	login: req.body.login,
	// 	password: req.body.password
	// })
	// usersSchema.addUser(newUser, (err, user) => {
	// 	if (err)
	// 		res.json({ status: false, msg: "Sorry not correct registration" })
	// 	else
	// 		res.json({ status: true, msg: "Your registartion success" })
	// })
	const { name, email, login, password } = req.body
	const isSigned = await usersSchema.findOne({ login })
	if (isSigned) {
		res.status(501).json('Exist')
	}
	else {
		res.status(200).json(req.body)
		usersSchema.create(
			name,
			email,
			login,
			password
		)
	}
})


router.post('/auth', (req, res) => {
	const { login, password } = req.body
	usersSchema.getLogin(login, (err, user) => {
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
							login: user.login,
							password: user.password,
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


router.get('/fetch/notate', async(req,res)=>{
	try{
		const abc = req.query
		console.log(abc);
		const data = await notateSchema.find({
			'author': abc
		})
		res.status(200).json(data)
	}catch(err){
		return res.status(500).json(err)
	}
})

router.post('/create/notate', (req, res) => {
	const { title, description, author } = req.body;
	console.log(req.query);
	const newNotate = new notateSchema({
		title,
		description,
		author
	})
	notateSchema.newNotate(newNotate, (err, notate) => {
		if (err)
			res.json({ status: false, msg: 'Notate not create' })
		else
			res.json({ status: true, msg: 'Notate success create' })
	})
})


router.get('/fetch/notates', async (req, res) => {
	try {
		const data = await notateSchema.find()
		res.json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})



module.exports = router