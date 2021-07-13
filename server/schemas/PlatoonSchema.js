const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema(
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
