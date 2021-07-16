import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default new Schema(
	{
		headline: {
			type: String,
			required: true,
		},
		text: String,
		creationDate: String,
		firstCreationDate: {
			type: Number,
			required: true,
		},
		type: String,
		volume: String,
		publicationPlace: {
			type: Schema.Types.ObjectId,
			ref: 'PublicationPlace',
		},
		authors: [{ author: String }],
		subdivisions: [String],
		exitData: String,
		character: {
			type: Schema.Types.ObjectId,
			ref: 'Character',
			default: '60599e7f6afc3f32c000e42b',
		},
		file: String,
	},
	{ versionKey: false },
)
