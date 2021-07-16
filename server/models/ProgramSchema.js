import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default new Schema(
	{
		headline: {
			type: String,
			required: true,
		},
		description: String,
		creationDate: String,
		firstCreationDate: {
			type: Number,
			required: true,
		},
		type: String,
		authors: [{ author: String }],
		subdivisions: [String],
		file: String,
		certificate: {
			code: String,
			file: String,
		},
	},
	{ versionKey: false },
)
