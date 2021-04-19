const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema(
	{
		type: {
			type: String,
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true
		},
		headline: {
			type: String,
			required: true,
		},
		text: {
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
		exitData: {
			type: String
		},
		pages: {
			type: Number
		},
		character: {
			type: Schema.Types.ObjectId,
			ref: 'Character',
		},
		file: {
			type: String
		}
	},
	{ versionKey: false }
)
