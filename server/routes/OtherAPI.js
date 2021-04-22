const mongoose = require('mongoose')
const schema = require('../schemas/OtherSchema')
const createAPIwithFile = require('../utils').createAPIwithFile

const Model = mongoose.model('Other', schema)
const resource = 'others'

const extractDataToSend = (data) => ({
    id: data.id,
    type: data.type,
    category: data.category,
    headline: data.headline,
    text: data.text,
    creationDate: data.creationDate,
    firstCreationDate: data.firstCreationDate,
    authors: data.authors,
    exitData: data.exitData !== 'null' ? data.exitData : undefined,
    pages: data.pages !== 0 ? data.pages : undefined,
    character: data.character !== 'null' ? data.character : undefined,
    file: {
        url: `${data.file.includes('http://') ? '' : process.env.SERVER}${data.file}`,
        title: data.headline
    }
})

const extractDataFromRequest = (req) => ({
    type: req.body.type,
    category: req.body.category,
    headline: req.body.headline,
    text: req.body.text,
    creationDate: req.body.creationDate,
    authors: JSON.parse(req.body.authors),
    exitData: req.body.exitData,
    pages: req.body.pages !== 'null' ? req.body.pages : 0,
    character: req.body.character
})

module.exports = (app) => {
    createAPIwithFile(app, resource, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.ArticleModel = Model
