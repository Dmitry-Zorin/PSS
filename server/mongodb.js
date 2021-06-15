const mongoose = require('mongoose')
const path = require('path')
const appRoot = require('app-root-path')

require('dotenv').config({
    path: path.join(
        appRoot.path,
        `.env.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}`
    )
})

const {DB_PORT, DB} = process.env

const mongodbUrl = `mongodb://localhost:${DB_PORT}/${DB}`

mongoose.connection.on('error', console.log)

module.exports = mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
