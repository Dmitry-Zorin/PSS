const path = require('path')
const appRoot = require('app-root-path')
const express = require('express')
const app = express()
const connectToDb = require('./mongodb')
const cors = require('cors')

const isDevelopment = process.env.NODE_ENV === 'development'

require('dotenv').config({
    path: path.join(appRoot.path, `.env.${isDevelopment ? 'dev' : 'prod'}`)
})

const {UI_SERVER, PORT, HOST} = process.env

if (isDevelopment) {
    app.use(cors({
        origin: UI_SERVER,
        exposedHeaders: 'Content-Range',
        credentials: true
    }))
}

require('./loader')(app)

app.use(express.static(path.join(appRoot.path, 'dist')))
app.use('/media', express.static(path.join(appRoot.path, 'media')))

app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.header('Pragma', 'no-cache')
    res.header('Expires', 0)
    next()
})

app.use((err, req, res) => {
    console.error(err.stack)
    res.status(500).send(null)
})

connectToDb
    .then(() => {
        app.listen(+PORT, HOST, () => {
            console.log('Server is running...')
        })
    })
    .catch(console.log)
