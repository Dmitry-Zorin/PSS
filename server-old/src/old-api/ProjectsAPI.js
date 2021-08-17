import mongoose from 'mongoose'
import { createApiwithFile, getFileIfExists } from '../utils_old'

const schema
from
..
/schemas/s
chemas
').projectsSchema

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

export default (app) => {
	createApiwithFile(
		app,
		resource,
		Model,
		extractDataToSend,
		extractDataFromRequest,
	)
}
