const mongoose = require('mongoose')
const schema = require('../schemas/LibrarySchema')
const createAPIwithFile = require('../utils').createAPIwithFile

const Model = mongoose.model('Library', schema)
const resource = 'library'

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
const mimeTypes = [
	'application/pdf',
	'application/x-rar-compressed',
	'application/zip',
	'image/vnd.djvu',
	'application/epub+zip',
	'application/x-mobipocket-ebook',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

const extractDataToSend = (data) => (
	{
		id: data.id,
		headline: data.headline,
		text: data.text,
		firstCreationDate: data.firstCreationDate,
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
		authors: body.authors && JSON.parse(body.authors),
		subdivisions: body.subdivisions && JSON.parse(body.subdivisions)
	}
)

module.exports = (app) => {
	createAPIwithFile(app, resource, mimeTypes, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.LibraryModel = Model
