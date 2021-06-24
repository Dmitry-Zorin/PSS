const mongoose = require('mongoose')
const schema = require('../schemas/EmployeeSchema')
const cookieParser = require("cookie-parser")()
const {auth} = require("../auth")
const {createAPIwithFile, getObjectProps, getFileIfExists} = require('../utils')
const fetch = require('node-fetch')

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

const getUserIssues = async (redmineId, startDate, dueDate) => {
    const urlParams = new URLSearchParams({
        assigned_to_id: redmineId,
        start_date: `>=${startDate}`,
        due_date: `<=${dueDate}`,
        status_id: '*',
        limit: 100
    })
    const resp = await fetch(
        `${process.env.REDMINE_SERVER}/issues.json?${urlParams}`, {
            headers: {'X-Redmine-API-Key': process.env.REDMINE_KEY}
        }
    )
    return await resp.json()
}

module.exports = (app) => {
    createAPIwithFile(app, resource, Model, extractDataToSend, extractDataFromRequest)

    app.get(`/api/${resource}/:id/redmine`, cookieParser, auth, async (req, res, next) => {
        try {
            const {startDate, dueDate} = getReportDates()

            const response = {
                score: 0,
                issueNumber: 0,
                issuesCompleted: 0,
                nonScienceHours: 0,
                startDate: dateToString(startDate),
                dueDate: dateToString(dueDate),
            }

            if (process.env.NODE_ENV !== 'production') {
                return res.json(response)
            }

            const {redmineId} = await Model.findById(req.params.id).exec()
            const issueData = await getUserIssues(redmineId, startDate, dueDate)
            const issues = issueData.issues
            response.issueNumber = issues.length

            for (const {tracker, status, estimated_hours = 0, custom_fields} of issues) {
                response.issuesCompleted += ['Решена', 'Закрыта'].includes(status.name)
                response.nonScienceHours += estimated_hours * (tracker.name !== 'Научная работа')

                if (custom_fields) {
                    const difficulty = custom_fields.find(f => f.name === 'Оценка сложности').value
                    const completion = custom_fields.find(f => f.name === 'Оценка качества выполнения').value
                    const score = difficulty * completion
                    if (!isNaN(score)) {
                        response.score += score
                    }
                }
            }

            res.json(response)
        }
        catch (err) {
            next(err)
        }
    })
}

const getReportDates = () => {
    const DAY_TO_MS = 24 * 60 * 60 * 1000
    const subtractDays = (numOfDays, date) => {
        date.setMilliseconds(date.getMilliseconds() - numOfDays * DAY_TO_MS)
    }
    const dateToString = (date) => (
        date.toJSON().slice(0, 10)
    )
    const date = new Date()
    while (date.getDay() !== 5) {
        subtractDays(1, date)
    }
    const dueDate = dateToString(date)
    subtractDays(4, date)
    const startDate = dateToString(date)
    return {startDate, dueDate}
}

const dateToString = (date) => {
    const [month, day] = date.split('-').slice(1)
    return `${day}.${month}`
}

module.exports.EmployeeModel = Model
module.exports.getReportDates = getReportDates
module.exports.dateToString = dateToString
