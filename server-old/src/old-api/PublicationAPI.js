import mongoose from 'mongoose'

const schema
from
..
/schemas/s
chemas
').publicationSchema
const { createApi }
from
..
/utils')

const Model = mongoose.model('PublicationPlace', schema)

const extractDataToSend = (data) => ({
	id: data.id,
	name: data.name,
	firstCreationDate: data.firstCreationDate,
})

const extractDataFromRequest = (req) => ({
	name: req.body.name,
})

const resource = 'publications'

export default (app) => {
	createApi(app, resource, Model, extractDataToSend, extractDataFromRequest)
}
