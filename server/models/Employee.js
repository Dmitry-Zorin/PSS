import mongoose from 'mongoose'

const schema = new mongoose.Schema(
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
		redmineInfo: [new mongoose.Schema({
			startDate: String,
			dueDate: String,
			score: Number,
			issueNumber: Number,
			issuesCompleted: Number,
			nonScienceHours: Number,
			hours: new mongoose.Schema({}, { strict: false }),
		})],
	},
	{ versionKey: false },
)

export default mongoose.model('Employee', schema)
