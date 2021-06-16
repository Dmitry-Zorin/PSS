const mongoose = require('mongoose')
const schema = require('../schemas/PlatoonSchema')
const employeeSchema = require('../schemas/EmployeeSchema')
const {createAPIwithFile, getObjectProps, getFileIfExists} = require("../utils")

const Model = mongoose.model('Platoon', schema)
const resource = 'platoons'

const props = [
    'id',
    'file',
    'name',
    'specialty',
    'platoonNumber',
    'companyNumber',
    'platoonCommander',
    'numOfPeople',
    'redmineId'
]

const extractDataToSend = async (data, withExtraData) => ({
    ...getObjectProps(data, props, getFileIfExists(data, {})),
    ...withExtraData && {
        employeeIds: await getEmployeeIds(data.platoonNumber, data.companyNumber)
    }
})

const extractDataFromRequest = ({body}) => (
    getObjectProps(body, props)
)

const getEmployeeIds = async (platoonNumber, companyNumber) => {
    const employees = await mongoose.model('Employee', employeeSchema)
        .find({platoonNumber, companyNumber}).exec()

    return employees.map(e => e.redmineId)
}

module.exports = (app) => {
    createAPIwithFile(app, resource, Model, extractDataToSend, extractDataFromRequest)
}

module.exports.PlatoonModel = Model
