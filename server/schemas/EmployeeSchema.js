const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema(
	{
		file: String,
		name: String,
		birthDate: String,
		birthPlace: String,
		nationality: String,
		education: String,
		university: String,
		specialty: String,
		languages: String,
		militaryCommissariat: String,
		militaryRank: String,
		draftDate: String,
		jobBefore: String,
		researchTopic: String,
		achievements: String,
		jobAfter: String,
		platoonNumber: String,
		companyNumber: String,
		redmineId: String,
		redmineInfo: [new Schema({
			startDate: String,
			dueDate: String,
			score: Number,
			issueNumber: Number,
			issuesCompleted: Number,
			nonScienceHours: Number,
			hours: new Schema({}, { strict: false }),
		})],
	},
	{ versionKey: false },
)
