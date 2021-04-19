const mongoose = require('mongoose')
const schema = require('../schemas').thesisSchema
const createAPIwithFile = require('../utils').createAPIwithFile

const Model = mongoose.model('Thesis', schema)
const resource = 'theses'

function extractDataToSend(data) {
	return {
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
		}
	}
}

function extractDataFromRequest(req) {
	return {
		'headline': req.body.headline,
		'description': req.body.description,
		'creationDate': new Date(req.body.creationDate),
		'authors': JSON.parse(req.body.authors),
		'subdivisions': req.body.subdivisions ? JSON.parse(req.body.subdivisions) : undefined,
	}
}

module.exports = function (app) {
	createAPIwithFile(app, resource, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.AbstractModel = Model
