const mongoose = require('mongoose')
const schema = require('../schemas/ArticleSchema')
const createAPIwithFile = require('../utils').createAPIwithFile

const Model = mongoose.model('Monograph', schema)
const resource = 'monographs'

const extractDataToSend = (data) => ({
    id: data.id,
    headline: data.headline,
    text: data.text,
    creationDate: data.creationDate,
    firstCreationDate: data.firstCreationDate,
    publicationPlace: data.publicationPlace || undefined,
    authors: data.authors,
    subdivisions: data.subdivisions,
    exitData: data.exitData !== 'null' ? data.exitData : undefined,
    pages: data.pages !== 0 ? data.pages : undefined,
    character: data.character !== 'null' ? data.character : undefined,
    file: {
        url: `${data.file.includes('http://') ? '' : process.env.SERVER}${data.file}`,
        title: data.headline
    }
})

const extractDataFromRequest = (req) => ({
    headline: req.body.headline,
    text: req.body.text,
    creationDate: req.body.creationDate,
    publicationPlace: req.body.publicationPlace,
    authors: JSON.parse(req.body.authors),
    subdivisions: req.body.subdivisions ? JSON.parse(req.body.subdivisions) : undefined,
    exitData: req.body.exitData,
    pages: req.body.pages !== 'null' ? req.body.pages : 0,
    character: req.body.character
})

module.exports = (app) => {
    createAPIwithFile(app, resource, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.ArticleModel = Model
