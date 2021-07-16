import mongoose from 'mongoose'
import { departmentSchema } from '../models/schemas.js'
import { createAPI } from '../utils.js'

const Model = mongoose.model('Department', departmentSchema)

const extractDataToSend = (data) => ({
	id: data.id,
	name: data.name,
	firstCreationDate: data.firstCreationDate,
})

const extractDataFromRequest = (req) => ({
	name: req.body.name,
})

const resource = 'departments'

export default (app) => {
	createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest)
}
