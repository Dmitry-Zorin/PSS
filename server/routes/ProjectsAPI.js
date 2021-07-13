const mongoose = require('mongoose')
const schema = require('../schemas/schemas').projectsSchema
const { createAPIwithFile, getFileIfExists } = require('../utils')

const Model = mongoose.model('Project', schema)
const resource = 'projects'

const extractDataToSend = (data) => ({
	resource: 'Проект',
	id: data.id,
	headline: data.headline,
	description: data.description,
	creationDate: data.creationDate,
	firstCreationDate: data.firstCreationDate,
	authors: data.authors,
	headPerformer: data.headPerformer,
	customer: data.customer,
	category: data.category,
	file: getFileIfExists(data),
})

const extractDataFromRequest = (req) => ({
	headline: req.body.headline,
	description: req.body.description,
	creationDate: req.body.creationDate,
	authors: JSON.parse(req.body.authors),
	headPerformer: req.body.headPerformer,
	customer: req.body.customer,
	category: req.body.category,
})

module.exports = (app) => {
	createAPIwithFile(app,
		resource,
		Model,
		extractDataToSend,
		extractDataFromRequest)
}

module.exports.ProjectsModel = Model
