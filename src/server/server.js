const path = require('path')
const mongoose = require('mongoose')
const appRoot = require('app-root-path')
const express = require('express')
const app = express()
const mongodbConfig = require('../mongodbConfig')
const cors = require('cors')

require('dotenv').config()

app.use(cors({
	origin: `http://${process.env.HOST}:${process.env.UI_PORT}`,
	exposedHeaders: 'Content-Range',
	credentials: true
}))

require('./routes/ArticleAPI')(app)
require('./routes/ProgramAPI')(app)
require('./routes/ResearchAPI')(app)
require('./routes/RationalizationAPI')(app)
require('./routes/PublicationAPI')(app)
require('./routes/AbstractAPI')(app)
require('./routes/PatentsAPI')(app)
require('./routes/UserAPI')(app)
require('./routes/SubdivisionAPI')(app)
require('./routes/ApprobationAPI')(app)
require('./routes/VerificationAPI')(app)
require('./routes/DevelopmentWorkAPI')(app)
require('./routes/ProjectsAPI')(app)
require('./routes/TimelineAPI')(app)

app.use(function (req, res, next) {
	res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
	res.header('Pragma', 'no-cache')
	res.header('Expires', 0)
	next()
})

app.use('/media', express.static(path.join(appRoot.path, '/media/')))

mongoose.connect(
	`mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`, mongodbConfig)
	.then(() => {
		app.listen(process.env.PORT, process.env.HOST, () => {
			console.log('Server has started.')
		})
	})
	.catch(error => console.log(error))