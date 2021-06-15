const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema(
    {
        file: String,
        name: String,
        specialty: String,
        platoonCommander: String,
        numOfPeople: String,
        redmineId: String
    },
    {versionKey: false}
)
