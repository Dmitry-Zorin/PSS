const mongoose = require('mongoose')
const schema = require('../schemas/PlatoonSchema')
const createAPIwithFile = require('../utils').createAPIwithFile

const Model = mongoose.model('Platoon', schema)
const resource = 'platoons'

const props = [
    'file',
    'name',
    'specialty',
    'platoonCommander',
    'numOfPeople',
    'redmineId'
]

const extractDataToSend = (data) => props.reduce((d, e) => {
    if (e !== 'file') d[e] = data[e]
    return d
}, {
    id: data.id,
    file: data.file ? {
        url: `${data.file.includes('http://') ? '' : process.env.SERVER}${data.file}`,
        title: data.name
    } : undefined
})

const extractDataFromRequest = ({body}) => props.reduce((d, e) => {
    d[e] = body[e]
    return d
}, {})

module.exports = (app) => {
    createAPIwithFile(app, resource, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.PlatoonModel = Model
