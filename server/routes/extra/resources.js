const cookieParser = require("cookie-parser")()
const {auth} = require("../../auth")
const mongoose = require('mongoose')

module.exports = (app) => (
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
)
