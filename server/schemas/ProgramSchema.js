const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema(
    {
        headline: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        creationDate: {
            type: Number,
            required: true
        },
        firstCreationDate: {
            type: Number,
            required: true
        },
        type: String,
        authors: [{author: String}],
        subdivisions: [String],
        file: {
            type: String,
            required: true
        },
        certificate: {
            code: String,
            file: String
        }
    },
    {versionKey: false}
)
