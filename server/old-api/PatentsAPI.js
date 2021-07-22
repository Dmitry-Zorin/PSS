import mongoose from 'mongoose'
import { createAPIwithFile, getFileIfExists } from '../utils_old'

const schema
from
..
/schemas/
PatentSchema
')

const Model = mongoose.model('Patents', schema)
const resource = 'patents'

const extractDataToSend = (data) => (
	{
		id: data.id,
		headline: data.headline,
		description: data.description,
		creationDate: data.creationDate,
		firstCreationDate: data.firstCreationDate,
		type: data.type || 'Патент',
		volume: data.volume,
		authors: data.authors,
		subdivisions: data.subdivisions,
		file: getFileIfExists(data),
	}
)

const extractDataFromRequest = (req) => (
	{
		headline: req.body.headline,
		description: req.body.description,
		creationDate: req.body.creationDate,
		type: req.body.type,
		volume: req.body.volume,
		authors: JSON.parse(req.body.authors),
		subdivisions: req.body.subdivisions
			? JSON.parse(req.body.subdivisions)
			: undefined,
	}
)

export default (app) => {
	createAPIwithFile(app,
		resource,
		Model,
		extractDataToSend,
		extractDataFromRequest)
}