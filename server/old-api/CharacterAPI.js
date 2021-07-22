import mongoose from 'mongoose'
import schema from '../models/CharacterSchema'
import { createAPI } from '../utils_old'

const Model = mongoose.model('Character', schema)

const extractDataToSend = (data) => ({
	resource: '',
	id: data.id,
	name: data.name,
	firstCreationDate: data.firstCreationDate,
})

const extractDataFromRequest = (req) => ({
	name: req.body.name,
})

const resource = 'characters'

export default (app) => {
	createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest)
}
