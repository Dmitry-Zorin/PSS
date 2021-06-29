const mongoose = require('mongoose')
const schema = require('../schemas/PlatoonSchema')
const {EmployeeModel} = require("./EmployeesAPI")
const cookieParser = require("cookie-parser")()
const {auth} = require("../auth")
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

const extractDataToSend = async (data) => (
    getObjectProps(data, props.filter(p => p !== 'file'), {
        file: getFileIfExists(data)
    })
)

const extractDataFromRequest = ({body}) => (
    getObjectProps(body, props)
)

const getEmployees = async (platoonNumber, companyNumber) => (
    EmployeeModel
        .find({platoonNumber, companyNumber})
        .sort('name')
        .exec()
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
                scores: [],
                people: []
            }

            const {platoonNumber, companyNumber} = await Model.findById(req.params.id).exec()
            const employees = await getEmployees(platoonNumber, companyNumber)

            for (const employee of employees) {
                const {redmineInfo} = employee
                const lastWeekInfo = redmineInfo.toObject().slice(-1)[0]
                delete lastWeekInfo.hours._id

                response.startDate = lastWeekInfo.startDate
                response.dueDate = lastWeekInfo.dueDate

                response.people.push({
                    name: employee.name,
                    ...lastWeekInfo
                })

                response.score += lastWeekInfo.score
                const employeeTotalScore = redmineInfo.reduce((total, info) => total + info.score, 0)
                response.totalScore += employeeTotalScore
                response.avgScore += employeeTotalScore /  redmineInfo.length

                const scores = redmineInfo.map(e => e.score)
                if (!response.scores.length) {
                    response.scores = scores
                }
                else {
                    while (scores.length < response.scores.length) {
                        scores.unshift(0)
                    }
                    while (response.scores.length < scores.length) {
                        response.scores.unshift(0)
                    }
                    response.scores = response.scores.map((e, i) => e + scores[i])
                }

                response.issueNumber += lastWeekInfo.issueNumber
                response.issuesCompleted += lastWeekInfo.issuesCompleted
                response.nonScienceHours += lastWeekInfo.nonScienceHours

                for (const [trackerName, value] of Object.entries(lastWeekInfo.hours)) {
                    if (response.hours[trackerName]) {
                        response.hours[trackerName] += value
                    }
                    else {
                        response.hours[trackerName] = value
                    }
                }
            }

            response.avgScore = Math.round(response.avgScore)
            res.json(response)
        }
        catch (err) {
            next(err)
        }
    })
}

module.exports.PlatoonModel = Model
