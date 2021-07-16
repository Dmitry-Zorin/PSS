import mongoose from 'mongoose'

const Schema = mongoose.Schema

exports.rationalizationSchema = new Schema(
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
		volume: String,
		authors: [{ author: String }],
		subdivisions: [String],
		file: String,
	},
	{ versionKey: false },
)

exports.researchSchema = new Schema(
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
		volume: String,
		headPerformer: String,
		customer: String,
		category: String,
		authors: [{ author: String }],
		file: String,
	},
	{ versionKey: false },
)

exports.developmentSchema = new Schema(
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
		volume: String,
		headPerformer: String,
		customer: String,
		category: String,
		authors: [{ author: String }],
		file: String,
	},
	{ versionKey: false },
)

exports.projectsSchema = new Schema(
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
		headPerformer: String,
		customer: String,
		category: String,
		authors: [{ author: String }],
		file: String,
	},
	{ versionKey: false },
)

exports.thesisSchema = new Schema(
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
		volume: String,
		authors: [{ author: String }],
		subdivisions: [String],
		file: String,
	},
	{ versionKey: false },
)

exports.approbationSchema = new Schema(
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
		volume: String,
		headPerformer: String,
		customer: String,
		authors: [{ author: String }],
		file: String,
	},
	{ versionKey: false },
)

exports.verificationSchema = new Schema(
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
		volume: String,
		headPerformer: String,
		customer: String,
		authors: [{ author: String }],
		file: String,
	},
	{ versionKey: false },
)

exports.subdivisionSchema = new Schema(
	{
		name: String,
		firstCreationDate: {
			type: Number,
			required: true,
		},
	},
	{ versionKey: false },
)

exports.publicationSchema = new Schema(
	{
		name: String,
		firstCreationDate: {
			type: Number,
			required: true,
		},
	},
	{ versionKey: false },
)

exports.departmentSchema = new Schema(
	{
		name: String,
		firstCreationDate: {
			type: Number,
			required: true,
		},
	},
	{ versionKey: false },
)
