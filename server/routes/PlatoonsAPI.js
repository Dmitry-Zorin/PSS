const mongoose = require('mongoose')
const schema = require('../schemas/PlatoonSchema')
const employeeSchema = require('../schemas/EmployeeSchema')
const cookieParser = require("cookie-parser")()
const {auth} = require("../auth")
const {createAPIwithFile, getObjectProps, getFileIfExists} = require("../utils")
const fetch = require("node-fetch")
const {dateToString, getReportDates} = require("./EmployeesAPI")

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
    await mongoose.model('Employee', employeeSchema)
        .find({platoonNumber, companyNumber})
        .sort('name')
        .exec()
)

const getIssues = async (limit, offset, startDate, dueDate) => {
    const urlParams = new URLSearchParams({
        start_date: `>=${startDate}`,
        due_date: `<=${dueDate}`,
        status_id: '*',
        offset,
        limit
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
                data: {
                    issueNumber: 0,
                    issuesCompleted: 0,
                    nonScienceHours: 0,
                    startDate: dateToString(startDate),
                    dueDate: dateToString(dueDate),
                },
                people: []
            }

            if (process.env.NODE_ENV !== 'production') {
                return res.json(response)
            }

            const {platoonNumber, companyNumber} = await Model.findById(req.params.id).exec()
            const employees = await getEmployees(platoonNumber, companyNumber)
            const employeeIds = employees.map(e => +e.redmineId)
            const issues = []

            const chunks = await Promise.all([...Array(4).keys()].map(i => (
                getIssues(100, i * 100, startDate, dueDate)
            )))

            for (const chunk of chunks) {
                issues.push(...chunk.issues.filter(i => (
                    i.assigned_to && employeeIds.includes(+i.assigned_to.id))
                ))
            }

            response.data.issueNumber = issues.length
            const people = {}

            for (const {assigned_to, tracker, status, estimated_hours = 0, custom_fields} of issues) {
                const issueComplete = ['Решена', 'Закрыта'].includes(status.name)
                const nonScienceHours = estimated_hours * (tracker.name !== 'Научная работа')

                response.data.issuesCompleted += issueComplete
                response.data.nonScienceHours += nonScienceHours

                if (assigned_to.id in people) {
                    const person = people[assigned_to.id]
                    person.issueNumber++
                    person.issuesCompleted += issueComplete
                    person.nonScienceHours += nonScienceHours
                }
                else {
                    const person = employees.find(e => +e.redmineId === +assigned_to.id)
                    if (person) {
                        people[assigned_to.id] = {
                            name: person.name,
                            issueNumber: 1,
                            issuesCompleted: +issueComplete,
                            nonScienceHours: nonScienceHours
                        }
                    }
                }

                if (custom_fields) {
                    const difficulty = custom_fields.find(f => f.name === 'Оценка сложности').value
                    const completion = custom_fields.find(f => f.name === 'Оценка качества выполнения').value
                    const score = difficulty * completion
                    if (!isNaN(score)) {
                        response.score += score
                    }
                }
            }

            response.people = Object.values(people).sort((a, b) => a.name - b.name)
            res.json(response)
        }
        catch (err) {
            next(err)
        }
    })
}

module.exports.PlatoonModel = Model
