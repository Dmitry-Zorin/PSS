const mongoose = require('mongoose')
const schema = require('../schemas/CategorySchema')
const createAPI = require('../utils').createAPI

const Model = mongoose.model('Category', schema)

const extractDataToSend = (data) => ({
    resource: '',
    id: data.id,
    name: data.name,
    firstCreationDate: data.firstCreationDate,
})

const extractDataFromRequest = (req) => ({
    name: req.body.name,
})

const resource = 'categories'

module.exports = (app) => {
    createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest)
}
