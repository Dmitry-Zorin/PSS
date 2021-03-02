const mongoose = require('mongoose')
const schema = require('../schemas/EmployeeSchema')
const createAPIwithFile = require('../utils').createAPIwithFile

const Model = mongoose.model('Employee', schema)
const resource = 'employees'

const extractDataToSend = (data) => (
	{
		id: data.id,
		headline: data.headline,
		text: data.text,
		firstCreationDate: data.firstCreationDate,
		tags: data.tags,
		authors: data.authors,
		subdivisions: data.subdivisions,
		file: {
			url: `${data.file.includes('http://') ? '' : process.env.SERVER}${data.file}`,
			title: data.headline
		}
	}
)

const extractDataFromRequest = ({ body }) => (
	{
		headline: body.headline,
		text: body.text,
		tags: body.tags && JSON.parse(body.tags),
		authors: body.authors && JSON.parse(body.authors),
		subdivisions: body.subdivisions && JSON.parse(body.subdivisions)
	}
)

module.exports = (app) => {
	createAPIwithFile(app, resource, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.EmployeeModel = Model
