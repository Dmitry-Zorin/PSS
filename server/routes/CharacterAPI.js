const mongoose = require('mongoose')
const schema = require('../schemas/CharacterSchema')
const { createAPI } = require('../utils')

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

module.exports = (app) => {
	createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest)
}
