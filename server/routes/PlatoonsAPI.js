const mongoose = require('mongoose')
const fetch = require('node-fetch')
const schema = require('../schemas/PlatoonSchema')
const employeeSchema = require('../schemas/EmployeeSchema')
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
    await mongoose.model('Employee', employeeSchema)
        .find({platoonNumber, companyNumber})
        .sort('name')
        .exec()
)

const getIssues = async (limit, offset) => {
    const urlParams = new URLSearchParams({
        created_date: '>=2021-06-14',
        due_date: '<=2021-06-18',
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
                const response = {
                    score: 0,
                    data: {
                        issueNumber: 0,
                        issuesCompleted: 0,
                        nonScienceHours: 0
                    },
                    people: []
                }

                if (process.env.NODE_ENV !== 'production') {
                    return res.json(response)
                }

                const {platoonNumber, companyNumber} = await Model.findById(req.params.id).exec()
                const employees = await getEmployees(platoonNumber, companyNumber)
                const employeeIds = employees.map(e => e.redmineId)
                const issues = []

                let offset = 0
                let limit = 100
                let totalCount = 0

                do {
                    const chunk = await getIssues(limit, offset)
                    totalCount = chunk.total_count
                    issues.push(...chunk.issues.filter(i => employeeIds.includes(i.assigned_to_id)))
                    offset = limit
                    limit += 100
                }
                while (offset < totalCount)

                response.data.issueNumber = issues.length
                const people = {}

                for (const {assigned_to_id, tracker, status, estimated_hours = 0} of issues) {
                    const issueComplete = ['Решена', 'Закрыта'].includes(status)
                    const nonScienceHours = estimated_hours * (tracker.name !== 'Научная деятельность')

                    response.data.issuesCompleted += issueComplete
                    response.data.nonScienceHours += nonScienceHours

                    if (assigned_to_id in people) {
                        const person = people[assigned_to_id]
                        person.issueNumber++
                        person.issuesCompleted += issueComplete
                        person.nonScienceHours += nonScienceHours
                    }
                    else {
                        const person = employees.find(e => +e.redmineId === +assigned_to_id)
                        if (person) {
                            people[assigned_to_id] = {
                                name: person.name,
                                issueNumber: 1,
                                issuesCompleted: +issueComplete,
                                nonScienceHours: nonScienceHours
                            }
                        }
                    }
                }

                response.people = Object.values(people).sort((a, b) => a.name - b.name)
                res.json(response)
            }
            catch (err) {
                next(err)
            }
        }
    )
}

module.exports.PlatoonModel = Model
