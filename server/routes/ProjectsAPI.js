const mongoose = require('mongoose')
const schema = require('../schemas').projectsSchema
const createAPIwithFile = require('../utils').createAPIwithFile

const Model = mongoose.model('Project', schema)
const resource = 'projects'

function extractDataToSend(data) {
    return {
        resource: 'Проект',
        id: data.id,
        headline: data.headline,
        description: data.description,
        creationDate: data.creationDate,
        firstCreationDate: data.firstCreationDate,
        authors: data.authors,
        headPerformer: data.headPerformer,
        customer: data.customer,
        category: data.category,
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
        'authors': JSON.parse(req.body.authors),
        'headPerformer': req.body.headPerformer,
        'customer': req.body.customer,
        'category': req.body.category,
    }
}

module.exports = function (app) {
    createAPIwithFile(app, resource, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.ProjectsModel = Model
