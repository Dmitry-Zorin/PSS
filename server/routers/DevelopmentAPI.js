import mongoose from 'mongoose'
import { developmentSchema } from '../models/schemas.js'
import { createAPIwithFile, getFileIfExists } from '../utils_old.js'

const Model = mongoose.model('Development', developmentSchema)
const resource = 'developments'

const extractDataToSend = (data) => ({
	resource: 'ОКР',
	id: data.id,
	headline: data.headline,
	description: data.description,
	creationDate: data.creationDate,
	firstCreationDate: data.firstCreationDate,
	volume: data.volume,
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
	volume: req.body.volume,
	authors: JSON.parse(req.body.authors),
	headPerformer: req.body.headPerformer,
	customer: req.body.customer,
	category: req.body.category,
})

export default (app) => {
	createAPIwithFile(app,
		resource,
		Model,
		extractDataToSend,
		extractDataFromRequest)
}
