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

            const {redmineInfo} = await Model.findById(req.params.id).exec()
            Object.assign(response, redmineInfo.toObject().slice(-1)[0])

            delete response._id
            delete response.hours._id

            response.totalScore = redmineInfo.reduce((total, info) => total + info.score, 0)
            response.avgScore = response.totalScore / redmineInfo.length | 0
            response.scores = redmineInfo.map(e => ({
                score: e.score,
                startDate: e.startDate,
                dueDate: e.dueDate
            }))

            res.json(response)
        }
        catch (err) {
            next(err)
        }
    })
}

module.exports.EmployeeModel = Model
