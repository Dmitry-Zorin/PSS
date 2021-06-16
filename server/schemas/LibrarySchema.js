const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema(
    {
        headline: {
            type: String,
            required: true,
        },
        text: {type: String,},
        firstCreationDate: {
            type: Number,
            required: true
        },
        tags: [{tag: String}],
        authors: [{author: String}],
        subdivisions: [String],
        file: String,
    },
    {versionKey: false}
)
