const mongoose = require('mongoose')
const schema = require('../schemas').researchSchema
const createAPIwithFile = require('../utils').createAPIwithFile

const Model = mongoose.model('Research', schema)
const resource = 'researches'

function extractDataToSend(data) {
    return {
        id: data.id,
        headline: data.headline,
        description: data.description,
        creationDate: data.creationDate,
        firstCreationDate: data.firstCreationDate,
        volume: data.volume,
        authors: data.authors,
        headPerformer: data.headPerformer,
        customer: data.customer,
        category: data.category,
        // subdivisions: data.subdivisions,
        file: {
            url: `${data.file.includes('http://') ? '' : process.env.SERVER}${data.file}`,
            title: data.headline
        }
    }
}

function extractDataFromRequest(req) {
    return {
        'headline': req.body.headline,
        'description': req.body.description,
        'creationDate': req.body.creationDate,
        'volume': req.body.volume,
        'authors': JSON.parse(req.body.authors),
        'headPerformer': req.body.headPerformer,
        'customer': req.body.customer,
        'category': req.body.category,
        // "subdivisions": JSON.parse(req.body.subdivisions),
    }
}

module.exports = function (app) {
    createAPIwithFile(app, resource, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.ResearchModel = Model
