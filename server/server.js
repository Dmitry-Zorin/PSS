const path = require('path')
const mongoose = require('mongoose')
const appRoot = require('app-root-path')
const express = require('express')
const app = express()
const mongodbConfig = require('./mongodbConfig')
const cors = require('cors')

require('dotenv').config()

if (process.env.NODE_ENV === 'development') {
	app.use(cors({
		origin: process.env.UI_SERVER,
		exposedHeaders: 'Content-Range',
		credentials: true
	}))
}

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
require('./routes/LibraryAPI')(app)
require('./routes/EmployeesAPI')(app)
require('./routes/CharacterAPI')(app)
require('./routes/OtherApi')(app)

app.use(function (req, res, next) {
	res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
	res.header('Pragma', 'no-cache')
	res.header('Expires', 0)
	next()
})

app.use('/media', express.static(path.join(appRoot.path, '/media/')))
app.use(express.static(path.join(appRoot.path, '/dist/')))

app.get("/*", (req, res) => {
	res.sendFile((path.join(appRoot.path, "/dist/index.html")));
})

mongoose.connect(
	`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB}`,
	mongodbConfig
)
	.then(() => {
		app.listen(
			process.env.PORT,
			process.env.HOST,
			() => console.log('Server has started.')
		)
	})
	.catch(console.log)
