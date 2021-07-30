import mongoose from 'mongoose'
import schema from '../models/LibrarySchema'
import { createApiwithFile, getFileIfExists } from '../utils_old'

const Model = mongoose.model('Library', schema)
const resource = 'library'

const extractDataToSend = (data) => (
	{
		id: data.id,
		headline: data.headline,
		text: data.text,
		firstCreationDate: data.firstCreationDate,
		tags: data.tags,
		authors: data.authors,
		subdivisions: data.subdivisions,
		file: getFileIfExists(data),
	}
)

const extractDataFromRequest = ({ body }) => (
	{
		headline: body.headline,
		text: body.text,
		tags: body.tags && JSON.parse(body.tags),
		authors: body.authors && JSON.parse(body.authors),
		subdivisions: body.subdivisions && JSON.parse(body.subdivisions),
	}
)

export default (app) => {
	createApiwithFile(
		app,
		resource,
		Model,
		extractDataToSend,
		extractDataFromRequest,
	)
}
