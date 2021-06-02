const mongoose = require('mongoose')
const schema = require('../schemas/ArticleSchema')
const createAPIwithFile = require('../utils').createAPIwithFile

const Model = mongoose.model('Abstract', schema)
const resource = 'abstracts'

const extractDataToSend = (data) => ({
    id: data.id,
    headline: data.headline,
    text: data.text,
    creationDate: data.creationDate,
    firstCreationDate: data.firstCreationDate,
    type: data.type || 'Автореферат',
    volume: data.volume,
    publicationPlace: data.publicationPlace || undefined,
    authors: data.authors,
    subdivisions: data.subdivisions,
    exitData: data.exitData !== 'null' ? data.exitData : undefined,
    character: data.character !== 'null' ? data.character : undefined,
    file: data.file ? {
        url: `${data.file.includes('http://') ? '' : process.env.SERVER}${data.file}`,
        title: data.headline
    } : undefined
})

const extractDataFromRequest = (req) => ({
    headline: req.body.headline,
    text: req.body.text,
    creationDate: req.body.creationDate,
    type: req.body.type,
    volume: req.body.volume,
    publicationPlace: req.body.publicationPlace,
    authors: JSON.parse(req.body.authors),
    subdivisions: req.body.subdivisions ? JSON.parse(req.body.subdivisions) : undefined,
    exitData: req.body.exitData,
    character: req.body.character
})

module.exports = (app) => {
    createAPIwithFile(app, resource, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.ArticleModel = Model
