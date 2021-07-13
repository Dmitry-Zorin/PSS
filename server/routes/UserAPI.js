const mongoose = require('mongoose')
const schema = require('../schemas/UserSchema')
const jsonWebToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { listParamsMiddleware } = require('../utils')
const jsonParser = require('express').json()

const resource = 'users'
const User = mongoose.model('User', schema)

const extractDataToSend = (data) => (
	{
		id: data.id,
		login: data.login,
		isAdmin: data.isAdmin,
		firstCreationDate: data.firstCreationDate,
	}
)

const extractDataFromRequest = (req) => (
	{
		login: req.body.login,
		password: req.body.password,
		isAdmin: req.body.isAdmin,
	}
)

const generateToken = (res, login, isAdmin) => {
	const token = jsonWebToken.sign(
		{ login, isAdmin },
		process.env.SECRET_KEY,
		{ expiresIn: 31536000 },
	)
	res.cookie('token', token, { httpOnly: true })
}

const login = (app) => {
	app.post('/api/login', jsonParser, async (req, res, next) => {
		try {
			const { login, password } = req.body
			const user = await User.findOne({ login })
			
			if (user) {
				const passwordIsCorrect = await bcrypt.compare(password, user.password)
				if (passwordIsCorrect) {
					generateToken(res, login, user.isAdmin)
					return res.sendStatus(200)
				}
			}
			res
				.status(401)
				.json({ error: 'Incorrect login or password' })
		}
		catch (err) {
			next(err)
		}
	})
}

module.exports = (app) => {
	
	// logout
	app.get('/api/logout', (req, res) => {
		res
			.clearCookie('token')
			.sendStatus(200)
	})
	
	// authenticate
	app.get('/api/authenticate', async (req, res) => {
		res.sendStatus(200)
	})
	
	// permissions
	app.get('/api/permissions', (req, res) => {
		res.json({ isAdmin: req.isAdmin })
	})
	
	// identity
	app.get('/api/identity', jsonParser, async (req, res, next) => {
		try {
			const user = await User.findOne({ login: req.login })
			res.json({
				id: user.id,
				fullName: user.login,
				isAdmin: user.isAdmin,
				locale: user.locale,
				theme: user.theme,
			})
		}
		catch (err) {
			next(err)
		}
	})
	
	// login existence
	app.post(`/api/${resource}/unique`, jsonParser, async (req, res, next) => {
		if (!req.isAdmin) {
			res
				.status(401)
				.json({ error: 'Access denied' })
		}
		try {
			const user = await User.findOne({ login: req.login }).exec()
			res.json({ exists: !!user })
		}
		catch (err) {
			next(err)
		}
	})
	
	// create
	app.post(`/api/${resource}`, jsonParser, async (req, res, next) => {
		if (!req.isAdmin) {
			res
				.status(401)
				.json({ error: 'Access denied' })
		}
		try {
			let data = extractDataFromRequest(req)
			
			if (await User.findOne({ login: data.login })) {
				return res
					.status(409)
					.json({ error: 'User already exists!' })
			}
			
			data.password = await bcrypt.hash(data.password, 10)
			data.firstCreationDate = new Date()
			
			const user = await User.create(data)
			res.json(extractDataToSend(user))
		}
		catch (err) {
			next(err)
		}
	})
	
	// update
	app.put(`/api/${resource}`, jsonParser, async (req, res, next) => {
		try {
			const user = await User.findOne({ login: req.login })
			for (const [key, value] of Object.entries(req.body)) {
				user[key] = value
			}
			await user.save()
			res.sendStatus(200)
		}
		catch (err) {
			next(err)
		}
	})
	
	// delete
	app.delete(`/api/${resource}/:id`, async (req, res, next) => {
		if (!req.isAdmin) {
			res.status(401).json({ error: 'Access denied' })
		}
		try {
			const user = await User.findByIdAndDelete(req.params.id)
			res.json(extractDataToSend(user))
		}
		catch (err) {
			next(err)
		}
	})
	
	// getList
	app.get(`/api/${resource}`, listParamsMiddleware, async (req, res, next) => {
		if (!req.isAdmin) {
			res.status(401).json({ error: 'Access denied' })
		}
		try {
			const {
				sortField,
				sortOrder,
				rangeStart,
				rangeEnd,
				filter,
			} = req.listParams
			
			const userData = await User.find(filter)
				.sort({ [sortField]: sortOrder })
				.exec()
			const contentLength = `${resource} ${rangeStart}-${rangeEnd - 1}/${userData.length}`
			const dataToSend = userData.slice(rangeStart, rangeEnd)
				.map(dataItem => extractDataToSend(dataItem))
			
			res
				.set('Content-Range', contentLength)
				.send(await Promise.all(dataToSend))
		}
		catch (err) {
			next(err)
		}
	})
	
	// getOne
	app.get(`/api/${resource}/:id`, async (req, res, next) => {
		if (!req.isAdmin) {
			res.status(401).json({ error: 'Access denied' })
		}
		try {
			const user = await User.findById(req.params.id).exec()
			res.json(extractDataToSend(user))
		}
		catch (err) {
			next(err)
		}
	})
}

module.exports.login = login
