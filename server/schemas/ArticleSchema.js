const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema(
    {
        headline: {
            type: String,
            required: true,
        },
        text: {
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
        publicationPlace: {
            type: Schema.Types.ObjectId,
            ref: 'PublicationPlace',
        },
        authors: [{author: String}],
        subdivisions: [String],
        exitData: {
            type: String
        },
        pages: {
            type: Number
        },
        character: {
            type: Schema.Types.ObjectId,
            ref: 'Character',
            default: '60599e7f6afc3f32c000e42b'
        },
        file: {
            type: String
        }
    },
    {versionKey: false}
)
