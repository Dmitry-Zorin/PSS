import mongoose from 'mongoose'
import schema from '../models/CategorySchema'
import { createApi } from '../utils_old'

const Model = mongoose.model('Category', schema)

const extractDataToSend = (data) => ({
	resource: '',
	id: data.id,
	name: data.name,
	firstCreationDate: data.firstCreationDate,
})

const extractDataFromRequest = (req) => ({
	name: req.body.name,
})

const resource = 'categories'

export default (app) => {
	createApi(app, resource, Model, extractDataToSend, extractDataFromRequest)
}
