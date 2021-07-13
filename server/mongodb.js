const mongoose = require('mongoose')
const path = require('path')
const appRoot = require('app-root-path')

require('dotenv').config({
	path: path.join(
		appRoot.path,
		`.env.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}`,
	),
})

module.exports = mongoose.connect(process.env.ATLAS_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
})

mongoose.connection.on('error', console.log)
