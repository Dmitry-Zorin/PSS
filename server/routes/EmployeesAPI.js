const mongoose = require('mongoose')
const schema = require('../schemas/EmployeeSchema')
const cookieParser = require("cookie-parser")()
const {auth} = require("../auth")
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
    getObjectProps(data, props.filter(p => p !== 'file'), {
        file: getFileIfExists(data)
    })
)

const extractDataFromRequest = ({body}) => (
    getObjectProps(body, props)
)

module.exports = (app) => {
    createAPIwithFile(app, resource, Model, extractDataToSend, extractDataFromRequest)

    app.get(`/api/${resource}/:id/redmine`, cookieParser, auth, async (req, res, next) => {
        try {
            const response = {
                score: 0,
                totalScore: 0,
                avgScore: 0,
                issueNumber: 0,
                issuesCompleted: 0,
                nonScienceHours: 0,
                hours: {},
                scores: []
            }

            const employee = await Model.findById(req.params.id).exec()
            const redmineInfo = JSON.parse(employee.redmineInfo)

            Object.assign(response, redmineInfo.slice(-1)[0])

            response.totalScore = redmineInfo.reduce((total, info) => total + info.score, 0)
            response.avgScore = response.totalScore / redmineInfo.length | 0
            response.scores = redmineInfo.map(e => e.score)

            res.json(response)
        }
        catch (err) {
            next(err)
        }
    })
}

module.exports.EmployeeModel = Model
