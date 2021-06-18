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
    getObjectProps(data, props.filter(p => p !== 'file'), getFileIfExists(data, {}))
)

const extractDataFromRequest = ({body}) => (
    getObjectProps(body, props)
)

const getUserIssues = async (redmineId) => {
    const urlParams = new URLSearchParams({
        assigned_to_id: redmineId,
        created_date: '>=2021-06-14',
        due_date: '<=2021-06-18',
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
            const response = {
                issueNumber: 0,
                issuesCompleted: 0,
                nonScienceHours: 0
            }

            if (process.env.NODE_ENV !== 'production') {
                return res.json(response)
            }

            const {redmineId} = await Model.findById(req.params.id).exec()
            const issueData = await getUserIssues(redmineId)
            const issues = issueData.issues
            response.issueNumber = issues.length

            for (const {tracker, status, estimated_hours = 0} of issues) {
                response.issuesCompleted += ['Решена', 'Закрыта'].includes(status)
                response.nonScienceHours += estimated_hours * (tracker?.name !== 'Научная деятельность')
            }

            res.json(response)
        }
        catch (err) {
            next(err)
        }
    })
}

module.exports.EmployeeModel = Model
