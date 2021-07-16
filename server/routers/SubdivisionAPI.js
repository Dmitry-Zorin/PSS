import mongoose from 'mongoose'

const schema
from
..
/schemas/s
chemas
').subdivisionSchema
const { createAPI }
from
..
/utils')

const Model = mongoose.model('Subdivision', schema)

const extractDataToSend = (data) => ({
	id: data.id,
	name: data.name,
	firstCreationDate: data.firstCreationDate,
})

const extractDataFromRequest = (req) => ({
	name: req.body.name,
})

const resource = 'subdivisions'

export default (app) => {
	createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest)
}
