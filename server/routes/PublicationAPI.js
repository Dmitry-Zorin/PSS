const mongoose = require('mongoose')
const schema = require('../schemas/schemas').publicationSchema
const {createAPI} = require('../utils')

const Model = mongoose.model('PublicationPlace', schema)

const extractDataToSend = (data) => ({
    id: data.id,
    name: data.name,
    firstCreationDate: data.firstCreationDate,
})

const extractDataFromRequest = (req) => ({
    name: req.body.name
})

const resource = 'publications'

module.exports = (app) => {
    createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest)
}
