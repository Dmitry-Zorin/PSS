const path = require('path')
const appRoot = require('app-root-path')
const express = require('express')
const app = express()
const connectToDb = require('./mongodb')
const cors = require('cors')
const cookieParser = require("cookie-parser")()
const {auth} = require("./auth")
const mongoose = require('mongoose')

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

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(null)
})

app.get('/api/resources', cookieParser, auth, async (req, res, next) => {
    try {
        const collections = mongoose.connection.collections
        const collectionCount = {}
        for (const [name, collection] of Object.entries(collections)) {
            collectionCount[name] = await collection.countDocuments()
        }
        res.json(collectionCount)
    }
    catch (err) {
        next(err)
    }
})

app.get('/api/form16', cookieParser, auth, async (req, res, next) => {
    try {
        const groups = [
            ['articles', 'monographs', 'abstracts', 'dissertations'],
            ['programs', 'patents', 'reports'],
            ['textbooks']
        ]

        const resourceData = [...Array(3).keys()].map(() => ({old: [], new: []}))
        const date = new Date().getFullYear() - 3
        const collections = mongoose.connection.collections

        const reduce = async (collection) => {
            const collectionArray = await collection.find().toArray()
            return collectionArray.reduce((p, e) => {
                p[e._id] = e.name
                return p
            }, {})
        }

        const publications = await reduce(collections.publicationplaces)
        const characters = await reduce(collections.characters)

        for (const [i, group] of groups.entries()) {
            for (const resource of group) {
                let data = await collections[resource]
                    .find({'authors.author': req.query.author})
                    .toArray()

                data = data.map(e => (
                    Object.assign(e, {
                        publicationPlace: publications[e.publicationPlace] || '',
                        character: characters[e.character] || '-----'
                    })
                ))

                resourceData[i].old = [
                    ...resourceData[i].old,
                    ...data.filter(e => e?.creationDate < date)
                ]

                resourceData[i].new = [
                    ...resourceData[i].new,
                    ...data.filter(e => e?.creationDate >= date)
                ]

                if (!resourceData[i].old.length) {
                    resourceData[i].old = resourceData[i].new
                    resourceData[i].new = []
                }
            }
        }

        res.json(resourceData)
    }
    catch (err) {
        next(err)
    }
})

connectToDb
    .then(() => {
        app.listen(+PORT, HOST, () => {
            console.log('Server is running...')
        })
    })
    .catch(console.log)
