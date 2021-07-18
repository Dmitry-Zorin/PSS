import appRoot from 'app-root-path'
import { json } from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'
import shortid from 'shortid'

const upload = multer()

export const listParamsMiddleware = (req, res, next) => {
	const { query } = req
	
	for (const [k, v] of Object.entries(query)) {
		query[k] = JSON.parse(v)
	}
	
	const { sort, range, filter } = query
	
	const filters = {}
	
	for (const [key, value] of Object.entries(filter)) {
		if (key === 'authors') {
			filters['authors.author'] = {
				$regex: value,
				$options: 'i',
			}
		}
		else if (key === 'tags') {
			filters['tags.tag'] = {
				$regex: value,
				$options: 'i',
			}
		}
		else if (['rota', 'publicationPlace', 'department', 'isAdmin'].includes(key)) {
			filters[key] = { $eq: value }
		}
		else {
			filters[key] = {
				$regex: value,
				$options: 'i',
			}
		}
	}
	
	req.listParams = {
		sortField: sort[0],
		sortOrder: sort[1],
		rangeStart: range[0],
		rangeEnd: range[1] + 1,
		filter: filters,
	}
	
	next()
}

export const createAPI = (app,
	resource,
	Model,
	extractDataToSend,
	extractDataFromRequest) => {
	
	// create
	app.post(`/api/${resource}`, upload.array(), json, async (req, res, next) => {
		if (!req.user.isAdmin) {
			return res.status(401).json({ error: 'Access denied' })
		}
		try {
			const record = await Model.create({
				...extractDataFromRequest(req),
				firstCreationDate: new Date,
			})
			res.json(await extractDataToSend(record))
		}
		catch (err) {
			next(err)
		}
	})
	
	// update
	app.put(`/api/${resource}/:id`, upload.array(), json, async (req, res, next) => {
		if (!req.user.isAdmin) {
			return res.status(401).json({ error: 'Access denied' })
		}
		try {
			const record = await Model.findByIdAndUpdate(
				req.params.id,
				extractDataFromRequest(req),
				{ new: true },
			).exec()
			res.json(await extractDataToSend(record))
		}
		catch (err) {
			next(err)
		}
	})
	
	// delete
	app.delete(`/api/${resource}/:id`, async (req, res, next) => {
		if (!req.user.isAdmin) {
			return res.status(401).json({ error: 'Access denied' })
		}
		try {
			const record = await Model.findByIdAndDelete({ _id: req.params.id })
				.exec()
			res.json(await extractDataToSend(record))
		}
		catch (err) {
			next(err)
		}
	})
	
	// getList
	app.get(`/api/${resource}`, listParamsMiddleware, async (req, res, next) => {
		const {
			sortField,
			sortOrder,
			rangeStart,
			rangeEnd,
			filter,
		} = req.listParams
		
		try {
			const records = await Model.find(filter)
				.sort({ [sortField]: sortOrder })
				.exec()
			const contentLength = `${resource} ${rangeStart}-${rangeEnd - 1}/${records.length}`
			const data = records.slice(rangeStart, rangeEnd)
				.map(async dataItem => await extractDataToSend(dataItem))
			
			res
				.set('Content-Range', contentLength)
				.send(await Promise.all(data))
		}
		catch (err) {
			next(err)
		}
	})
	
	// getOne
	app.get(`/api/${resource}/:id`, async (req, res, next) => {
		try {
			const record = await Model.findOne({ _id: req.params.id }).exec()
			res.json(await extractDataToSend(record))
		}
		catch (err) {
			next(err)
		}
	})
	
	// getMany
	app.post(`/api/${resource}/many`, upload.array('ids'), async (req, res, next) => {
		try {
			const records = await Model.find()
				.where('_id')
				.in(JSON.parse(req.body.ids))
				.exec()
			const data = records.map(async data => await extractDataToSend(data))
			res.send(await Promise.all(data))
		}
		catch (err) {
			next(err)
		}
	})
}

export const createAPIwithFile = (
	app,
	resource,
	Model,
	extractDataToSend,
	extractDataFromRequest,
) => {
	const filesStorage = multer.diskStorage({
		destination: (req, file, cb) => {
			const dir = appRoot.resolve(`../media/${resource}`)
			if (!fs.existsSync(dir)) fs.mkdirSync(dir)
			if (!['certificateFile', 'newCertificateFile'].includes(file.fieldname)) {
				return cb(null, dir)
			}
			const certificatesDir = path.join(dir, 'certificates')
			if (!fs.existsSync(certificatesDir)) fs.mkdirSync(certificatesDir)
			cb(null, certificatesDir)
		},
		filename: (req, file, cb) => {
			cb(null, shortid.generate() + '_' + file.originalname)
		},
	})
	
	const formData = multer({
		storage: filesStorage,
	})
	
	// create
	app.post(`/api/${resource}`, formData.fields([
		{ name: 'file', maxCount: 1 },
		{ name: 'certificateFile', maxCount: 1 },
	]), async (req, res, next) => {
		if (!req.user.isAdmin) {
			return res.status(401).json({ error: 'Access denied' })
		}
		
		try {
			const data = extractDataFromRequest(req)
			data.firstCreationDate = new Date
			
			if (req.files.file) {
				data.file = path.join(filesFolder, req.files.file[0].filename)
				
				if (req.files.certificateFile) {
					data.certificate.file =
						path.join(
							filesFolder,
							'certificates',
							req.files.certificateFile[0].filename,
						)
				}
			}
			
			const record = await Model.create(data)
			res.json(await extractDataToSend(record))
		}
		catch (err) {
			next(err)
		}
	})
	
	// update
	app.put(`/api/${resource}/:id`, formData.fields([
		{ name: 'newfile', maxCount: 1 },
		{ name: 'newCertificateFile', maxCount: 1 },
	]), async (req, res, next) => {
		if (!req.user.isAdmin) {
			return res.status(401).json({ error: 'Access denied' })
		}
		
		try {
			const data = extractDataFromRequest(req)
			
			if (req.files && req.files.newfile) {
				data.file = path.join(filesFolder, req.files.newfile[0].filename)
				if (/https?/.test(req.body.file)) {
					const oldFilePath = appRoot.resolve(
						req.body.file.replace(/https?[^a-z]+(localhost)?[^a-z]+/, '..'),
					)
					fs.unlink(oldFilePath, console.log)
				}
			}
			else if (req.body.file) {
				const match = req.body.file.match(/.media.+/)
				if (match && match.length) {
					data.file = match[0]
				}
			}
			
			if (req.files && req.files.newCertificateFile || req.body.certificateCode
				=== 'null') {
				if (req.body.certificateCode !== 'null') {
					data.certificate.file =
						path.join(filesFolder,
							'certificates',
							req.files.newCertificateFile[0].filename)
				}
				if (/https?/.test(req.body.certificateFile)) {
					const oldFilePath = appRoot.resolve(
						req.body.certificateFile.replace(/https?[^a-z]+(localhost)?[^a-z]+/, '..'),
					)
					fs.unlink(oldFilePath, console.log)
				}
			}
			else if (req.body.certificateFile) {
				const match = req.body.certificateFile.match(/.media.+/)
				if (match && match.length) {
					data.certificate.file = match[0]
				}
			}
			
			const record = await Model.findByIdAndUpdate(req.params.id,
				data,
				{ new: true }).exec()
			res.json(await extractDataToSend(record))
		}
		catch (err) {
			next(err)
		}
	})
	
	// delete
	app.delete(`/api/${resource}/:id`, async (req, res, next) => {
		if (!req.user.isAdmin) {
			return res.status(401).json({ error: 'Access denied' })
		}
		
		try {
			const record = await Model.findByIdAndDelete({ _id: req.params.id })
				.exec()
			
			if (record.file) {
				const filePath = appRoot.resolve(
					record.file.replace(/https?[^a-z]+(localhost)?[^a-z]+/, '..'),
				)
				fs.unlink(filePath, console.log)
				
				if (record.certificate && record.certificate.file) {
					const certificateFilePath = appRoot.resolve(
						record.certificate.file.replace(/https?[^a-z]+(localhost)?[^a-z]+/, '..'),
					)
					fs.unlink(certificateFilePath, console.log)
				}
			}
			
			res.json(await extractDataToSend(record))
		}
		catch (err) {
			next(err)
		}
	})
	
	// getList
	app.get(`/api/${resource}`, listParamsMiddleware, async (req, res, next) => {
		const {
			sortField,
			sortOrder,
			rangeStart,
			rangeEnd,
			filter,
		} = req.listParams
		
		try {
			const record = await Model.find(filter)
				.sort({ [sortField]: sortOrder })
				.exec()
			const contentLength = `${resource} ${rangeStart}-${rangeEnd - 1}/${record.length}`
			const data = record.slice(rangeStart, rangeEnd).map(async record => {
				const data = await extractDataToSend(record)
				return Object.entries(data).reduce((obj, [k, v]) => {
					obj[k] = ([null, 'null'].includes(v) ? '-' : v)
					return obj
				}, {})
			})
			
			res
				.set('Content-Range', contentLength)
				.send(await Promise.all(data))
		}
		catch (err) {
			next(err)
		}
	})
	
	// getOne
	app.get(`/api/${resource}/:id`, async (req, res, next) => {
		try {
			const record = await Model.findOne({ _id: req.params.id }).exec()
			const data = await extractDataToSend(record)
			res.json(Object.entries(data).reduce((obj, [k, v]) => {
				obj[k] = ([null, 'null'].includes(v) ? '-' : v)
				return obj
			}, {}))
		}
		catch (err) {
			next(err)
		}
	})
}

export const getFileIfExists = (data, defaultObj = undefined) => (
	!data.file ? defaultObj : {
		url: `${data.file.includes('https?://') ? '' : process.env.SERVER}${data.file}`,
		title: data.headline || data.name,
	}
)

export const getObjectProps = (data, props, defaultObj = {}) => (
	props.reduce((obj, e) => {
		obj[e] = data[e]
		return obj
	}, defaultObj)
)
