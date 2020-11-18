const mongoose = require('mongoose')
const schema = require('../schemas/PatentSchema')
const createAPIwithFile = require('../utils').createAPIwithFile

const Model = mongoose.model('Patents', schema)
const resource = 'patents'
const mimeTypes = [
	'application/zip',
	'application/octet-stream',
	'application/x-rar-compressed',
	'application/vnd.rar',
	'application/x-7z-compressed'
]

const extractDataToSend = (data) => (
	{
		id: data.id,
		headline: data.headline,
		description: data.description,
		creationDate: data.creationDate,
		firstCreationDate: data.firstCreationDate,
		authors: data.authors,
		subdivisions: data.subdivisions,
		file: {
			url: `${data.file.includes('http://') ? '' : process.env.SERVER}${data.file}`,
			title: data.headline
		},
		certificate: data.certificate ? {
			code: data.certificate.code,
			file: data.certificate.file ? {
				url: `${data.certificate.file.includes('http://') ? '' : process.env.SERVER}${data.certificate.file}`
			} : undefined
		} : undefined
	}
)

const extractDataFromRequest = (req) => (
	{
		headline: req.body.headline,
		description: req.body.description,
		creationDate: new Date(req.body.creationDate),
		authors: JSON.parse(req.body.authors),
		subdivisions: req.body.subdivisions ? JSON.parse(req.body.subdivisions) : undefined,
		certificate: {
			code: req.body.certificateCode
		}
	}
)

module.exports = (app) => {
	createAPIwithFile(app, resource, mimeTypes, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.PatentsModel = Model
