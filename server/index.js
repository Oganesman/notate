const express = require('express')
const userRouting = require('./routing/router')
const notateRouting = require('./routing/notate')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const mongoDB = require('./mongoDB/db')
const passport = require('passport')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(cors())

//passport
app.use(session({
	secret: mongoDB.secret,
	resave: false,
	saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
require('./passport/passport')(passport)

// create static file (html,css...)
app.use(express.static(path.join(__dirname, 'public')))

//mongoDB
mongoose.connect(mongoDB.db)
mongoose.connection.on('connected', () => {
	console.log('mongo connected successful');
})
mongoose.connection.on('error', (err) => {
	console.log('error' + err);
})

//router
app.get('/', (req, res) => {
	res.json('Home')
})
app.use('/user', userRouting)
app.use('/notate', notateRouting)

app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(port, function (req, res) {
	console.log('Server started on port ' + port)
})