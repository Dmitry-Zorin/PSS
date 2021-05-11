const mongoose = require('mongoose')
const schema = require('../schemas/ProgramSchema')
const createAPIwithFile = require('../utils').createAPIwithFile

const Model = mongoose.model('Program', schema)
const resource = 'programs'

const extractDataToSend = (data) => (
    {
        id: data.id,
        headline: data.headline,
        description: data.description,
        creationDate: data.creationDate,
        firstCreationDate: data.firstCreationDate,
        type: data.type || 'Программа',
        authors: data.authors,
        subdivisions: data.subdivisions,
        file: {
            url: `${data.file.includes('http://') ? '' : process.env.SERVER}${data.file}`,
            title: data.headline
        },
        certificate: data.certificate ? {
            code: data.certificate.code !== 'null' ? data.certificate.code : undefined,
            file: data.certificate.file ? {
                url: `${data.certificate.file.includes('http://') ? '' : process.env.SERVER}${data.certificate.file}`
            } : undefined
        } : undefined
    }
)

const extractDataFromRequest = (req) => (
    {
        headline: req.body.headline,
        description: req.body.description,
        creationDate: req.body.creationDate,
        type: req.body.type,
        authors: JSON.parse(req.body.authors),
        subdivisions: req.body.subdivisions ? JSON.parse(req.body.subdivisions) : undefined,
        certificate: {
            code: req.body.certificateCode
        }
    }
)

module.exports = function (app) {
    createAPIwithFile(app, resource, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.ProgramModel = Model
