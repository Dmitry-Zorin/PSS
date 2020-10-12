const cookieParser = require('cookie-parser')()
const mongoose = require('mongoose')
const auth = require('../auth').auth
const schema = require('../schemas').articleSchema

module.exports = app => {
	app.get(`/api/timeline`, cookieParser, auth, (req, res) => {
        mongoose.model('Article', schema)
            .find()
            .then(data => {
                res.send(data.map(e => ({
                    title: e.headline,
                    creationDate: e.creationDate,
                })))
            })
	})
}