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
        redmineId: Number
    },
    {versionKey: false}
)
