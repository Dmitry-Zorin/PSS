import mongoose from 'mongoose'
import { departmentSchema } from '../models/schemas'
import { createApi } from '../utils_old'

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
	createApi(app, resource, Model, extractDataToSend, extractDataFromRequest)
}
