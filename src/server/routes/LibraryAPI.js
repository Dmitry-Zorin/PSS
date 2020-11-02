const mongoose = require('mongoose')
const schema = require('../schemas/LibrarySchema')
const createAPIwithFile = require('../utils').createAPIwithFile

const Model = mongoose.model('Library', schema)
const resource = 'library'
const mimeTypes = ['application/pdf']

const extractDataToSend = (data) => ({
	id: data.id,
	headline: data.headline,
	text: data.text,
	creationDate: data.creationDate,
	firstCreationDate: data.firstCreationDate,
	authors: data.authors,
	subdivisions: data.subdivisions,
	file: {
		url: `${data.file.includes('http://') ? '' : process.env.SERVER}${data.file}`,
		title: data.headline
	}
})

const extractDataFromRequest = ({ body }) => ({
	headline: body.headline,
	text: body.text,
	creationDate: new Date(body.creationDate),
	authors: JSON.parse(body.authors),
	subdivisions: body.subdivisions ? JSON.parse(body.subdivisions) : undefined,
})

module.exports = (app) => {
	createAPIwithFile(app, resource, mimeTypes, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.LibraryModel = Model
