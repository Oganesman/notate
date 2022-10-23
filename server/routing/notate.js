const express = require('express')
const router = express.Router()
const notateSchema = require('../mongoDB/notates-schema')

// create notate
router.post('/create', (req, res) => {
	const { title, description, author, background } = req.body
	const newNotate = new notateSchema({
		title,
		description,
		author,
		background
	})
	notateSchema.newNotate(newNotate, (newNotate, (err, notate) => {
		if (err)
			res.json({ status: false, msg: 'Notate not create' })
		else
			res.json({ status: true, msg: 'Notate success create' })
	}))
})

// show notate
router.get('/show', async (req, res) => {
	try {
		const _id = req.query
		const myNotate = await notateSchema.find({
			'author': _id
		})
		res.status(200).json(myNotate)
	} catch (err) {
		return res.status(500).json(err)
	}
})

//update
router.patch('/update', async (req, res) => {
	try {
		const { title, description, id } = req.body
		await notateSchema.updateOne({ _id: id }, {
			$set: {
				title,
				description
			}
		})
		res.status(200).json('item success updated')
	} catch (err) {
		return res.status(500).json(err)
	}
})

// delete
router.delete('/delete', async (req, res) => {
	try {
		const id = req.query
		await notateSchema.findByIdAndDelete(id)
		res.status(200).json('notate success deleted')
	} catch (err) {
		return res.status(500).json(err)
	}
})

// change background color
router.post('/background', async (req, res) => {
	try {
		const { id, colorNum } = req.body
		await notateSchema.updateOne({ _id: id }, {
			$set: {
				background: colorNum
			}
		})
		res.status(200).json('Change background color')
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