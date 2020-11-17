const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema(
	{
		headline: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		creationDate: {
			type: Date,
			required: true
		},
		firstCreationDate: {
			type: Date,
			required: true
		},
		authors: [{ author: String }],
		subdivisions: [String],
		file: {
			type: String,
			required: true
		},
		certificate: {
			code: String,
			file: String
		}
	},
	{ versionKey: false }
)
