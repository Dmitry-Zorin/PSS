const { Schema } = require('mongoose')

module.exports = new Schema(
	{
		login: {
			type: String,
			required: true,
			unique: true,
		},
		password: String,
		isAdmin: {
			type: Boolean,
			default: false,
		},
		locale: String,
		theme: String,
		firstCreationDate: {
			type: Number,
			required: true,
		},
	},
	{ versionKey: false },
)
