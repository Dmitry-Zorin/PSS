const fs = require('fs')
const path = require('path')
const jsonParser = require('express').json()
const multer = require('multer')
const upload = multer()
const appRoot = require('app-root-path')
const shortid = require('shortid')
const cookieParser = require('cookie-parser')()
const auth = require('./auth').auth

function listParamsMiddleware(req, res, next) {
	const { query } = req

	for (const [k, v] of Object.entries(query)) {
		query[k] = JSON.parse(v)
	}

	const { sort, range, filter } = query

	const filters = {}

	for (const [key, value] of Object.entries(filter)) {
		if (key === 'dateFrom') {
			const date = new Date(value)
			date.setHours(0, 0, 0, 0)
			if (filters.creationDate) {
				filters.creationDate.$gte = date
			}
			else {
				filters.creationDate = { $gte: date }
			}
		}
		else if (key === 'dateTo') {
			const date = new Date(value)
			date.setHours(0, 0, 0, 0)
			date.setHours(0, 0, 0, 0)
			if (filters.creationDate) {
				filters.creationDate.$lt = date
			}
			else {
				filters.creationDate = { $lt: date }
			}
		}
		else if (key === 'authors') {
			filters['authors.author'] = {
				$regex: value,
				$options: 'i'
			}
		}
		else if (key === 'tags') {
			filters['tags.tag'] = {
				$regex: value,
				$options: 'i'
			}
		}
		else if (['rota', 'publicationPlace', 'department', 'isAdmin'].includes(key)) {
			filters[key] = { $eq: value }
		}
		else {
			filters[key] = {
				$regex: value,
				$options: 'i'
			}
		}
	}

	req.listParams = {
		sortField: sort[0],
		sortOrder: sort[1],
		rangeStart: range[0],
		rangeEnd: range[1] + 1,
		filter: filters
	}

	next()
}

/*
extractDataFromRequest: -firstCreationDate, -file
*/

function createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest) {
	// create
	app.post(`/api/${resource}`, upload.array(), cookieParser, auth, jsonParser, (req, res) => {
		if (!req.isAdmin) {
			return res.status(401).json({ error: 'Access denied' })
		}

		let data = extractDataFromRequest(req)
		data['firstCreationDate'] = new Date()
		const modelRecord = new Model(data)
		modelRecord.save()
			.then(() => res.json(extractDataToSend(modelRecord)))
			.catch(console.log)
	})

	// update
	app.put(`/api/${resource}/:id`, upload.array(), cookieParser, auth, jsonParser, (req, res) => {
		if (!req.isAdmin) {
			return res.status(401).json({ error: 'Access denied' })
		}

		Model.findByIdAndUpdate(
			req.params.id,
			extractDataFromRequest(req),
			{ new: true }
		)
			.then(data => res.json(extractDataToSend(data)))
			.catch(console.log)
	})

	// delete
	app.delete(`/api/${resource}/:id`, cookieParser, auth, (req, res) => {
		if (!req.isAdmin) {
			return res.status(401).json({ error: 'Access denied' })
		}

		Model.findByIdAndDelete({ _id: req.params.id })
			.then(data => res.json(extractDataToSend(data)))
			.catch(console.log)
	})

	// getList
	app.get(`/api/${resource}`, cookieParser, auth, listParamsMiddleware, (req, res) => {
		const { sortField, sortOrder, rangeStart, rangeEnd, filter } = req.listParams
		Model.find(filter)
			.sort({ [sortField]: sortOrder })
			.then(data => {
				const contentLength = `${resource} ${rangeStart}-${rangeEnd - 1}/${data.length}`
				const dataToSend = data.slice(rangeStart, rangeEnd)
					.map(dataItem => extractDataToSend(dataItem))
				res.set('Content-Range', contentLength).send(dataToSend)
			})
			.catch(console.log)
	})

	// getOne
	app.get(`/api/${resource}/:id`, cookieParser, auth, (req, res) => {
		Model.findOne({ _id: req.params.id })
			.then(data => res.json(extractDataToSend(data)))
			.catch(console.log)
	})

	// getMany
	app.post(`/api/${resource}/many`, cookieParser, auth, upload.array('ids'), (req, res) => {
		Model.find().where('_id').in(JSON.parse(req.body.ids)).exec((error, records) => {
			if (error) {
				return console.log(error)
			}
			res.send(records.map(data => extractDataToSend(data)))
		})
	})
}

function createAPIwithFile(app, resource, mimeTypes, Model, extractDataToSend, extractDataFromRequest) {
	let filesFolder = path.join('/media/', resource)

	const filesStorage = multer.diskStorage({
		destination: (req, file, cb) => {
			const dir = path.join(appRoot.path, filesFolder)
			if (!fs.existsSync(dir)) fs.mkdirSync(dir)
			const certificatesDir = path.join(dir, 'certificates')
			if (!fs.existsSync(certificatesDir)) {
				fs.mkdirSync(certificatesDir)
			}
			cb(null, file.fieldname === 'certificateFile' ? certificatesDir : dir)
		},
		filename: (req, file, cb) => {
			cb(null, shortid.generate() + '_' + file.originalname)
		},
	})

	const formData = multer({
		storage: filesStorage,
		fileFilter: (req, file, cb) => {
			if (mimeTypes.includes(file.mimetype)) {
				cb(null, true)
			}
			else cb(null, false)
		}
	})

	// create
	app.post(`/api/${resource}`, cookieParser, auth, formData.fields([
		{ name: 'file', maxCount: 1 },
		{ name: 'certificateFile', maxCount: 1 }
	]), (req, res) => {
		if (!req.isAdmin) {
			return res.status(401).json({ error: 'Access denied' })
		}

		const data = extractDataFromRequest(req)
		data.firstCreationDate = new Date()
		data.file = path.join(filesFolder, req.files.file[0].filename)

		if (req.files.certificateFile) {
			data.certificate.file = path.join(filesFolder, 'certificates', req.files.certificateFile[0].filename)
		}

		const modelRecord = new Model(data)
		modelRecord.save()
			.then(() => res.json(extractDataToSend(modelRecord)))
			.catch(console.log)
	})

	// update
	app.put(`/api/${resource}/:id`, cookieParser, auth, formData.single('newfile'), (req, res) => {
		if (!req.isAdmin) {
			return res.status(401).json({ error: 'Access denied' })
		}

		const data = extractDataFromRequest(req)

		if (req.file) {
			data.file = path.join(filesFolder, req.file.filename)
			const oldFilePath = path.join(appRoot.path, req.body.file.replace(/http[^a-z]+(localhost)?[^a-z]+/, ''))
			fs.unlink(oldFilePath, error => {
				if (error) console.log(error)
			})
		}
		else {
			data.file = req.body.file
		}

		Model.findByIdAndUpdate(
			req.params.id,
			data,
			{ new: true }
		)
			.then(updatedData => res.json(extractDataToSend(updatedData)))
			.catch(console.log)
	})

	// delete
	app.delete(`/api/${resource}/:id`, cookieParser, auth, (req, res) => {
		if (!req.isAdmin) {
			return res.status(401).json({ error: 'Access denied' })
		}

		Model.findByIdAndDelete({ _id: req.params.id })
			.then(data => {
				const filePath = path.join(appRoot.path, data.file.replace(/http[^a-z]+(localhost)?[^a-z]+/, ''))
				fs.unlink(filePath, error => {
					if (error) console.log(error)
				})
				res.json(extractDataToSend(data))
			})
			.catch(console.log)
	})

	// getList
	app.get(`/api/${resource}`, cookieParser, auth, listParamsMiddleware, (req, res) => {
		const { sortField, sortOrder, rangeStart, rangeEnd, filter } = req.listParams

		Model.find(filter)
			.sort({ [sortField]: sortOrder })
			.then(data => {
				const contentLength = `${resource} ${rangeStart}-${rangeEnd - 1}/${data.length}`
				const dataToSend = data.slice(rangeStart, rangeEnd)
					.map(dataItem => extractDataToSend(dataItem))
				res.set('Content-Range', contentLength).send(dataToSend)
			})
			.catch(console.log)
	})

	// getOne
	app.get(`/api/${resource}/:id`, cookieParser, auth, (req, res) => {
		Model.findOne({ _id: req.params.id })
			.then(data => res.json(extractDataToSend(data)))
			.catch(console.log)
	})
}

exports.listParamsMiddleware = listParamsMiddleware
exports.createAPI = createAPI
exports.createAPIwithFile = createAPIwithFile
