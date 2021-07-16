import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default new Schema(
	{
		file: String,
		name: String,
		specialty: String,
		platoonNumber: String,
		companyNumber: String,
		platoonCommander: String,
		numOfPeople: String,
		redmineId: String,
	},
	{ versionKey: false },
)
