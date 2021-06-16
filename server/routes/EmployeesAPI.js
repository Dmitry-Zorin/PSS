const mongoose = require('mongoose')
const schema = require('../schemas/EmployeeSchema')
const {createAPIwithFile, getObjectProps, getFileIfExists} = require('../utils')

const Model = mongoose.model('Employee', schema)
const resource = 'employees'

const props = [
    'id',
    'file',
    'name',
    'birthDate',
    'birthPlace',
    'nationality',
    'education',
    'university',
    'specialty',
    'languages',
    'militaryCommissariat',
    'militaryRank',
    'draftDate',
    'jobBefore',
    'researchTopic',
    'achievements',
    'jobAfter',
    'platoonNumber',
    'companyNumber',
    'redmineId'
]

const extractDataToSend = (data) => (
    getObjectProps(data, props, getFileIfExists(data, {}))
)

const extractDataFromRequest = ({body}) => (
    getObjectProps(body, props)
)

module.exports = (app) => {
    createAPIwithFile(app, resource, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.EmployeeModel = Model
