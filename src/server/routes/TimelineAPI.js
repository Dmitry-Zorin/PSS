const { listParamsMiddleware } = require('../utils')
const cookieParser = require('cookie-parser')()
const auth = require('../auth').auth

//const { AbstractModel } = require('./AbstractAPI')
//const { ApprobationModel } = require('./ApprobationAPI')
const { ArticleModel } = require('./ArticleAPI')

const translations = {
	//abstracts: 'Тезис доклада',
	//approbations: 'Апробация',
	articles: 'Статья'
}

module.exports = app => {
	app.get(`/api/timeline`, cookieParser, auth, listParamsMiddleware, (req, res) => {
		const { sortField, sortOrder, rangeStart, rangeEnd, filter } = req.listParams

		ArticleModel.find(filter)
			.sort({ [sortField]: sortOrder })
			.then(data => {
				const contentLength = `timeline ${rangeStart}-${rangeEnd - 1}/${data.length}`
				res.set('Content-Range', contentLength).send(
					data.slice(rangeStart, rangeEnd).map(e => ({
						id: e._id,
						title: e.headline,
						creationDate: e.firstCreationDate,
						type: ArticleModel.collection.collectionName,
						translation: translations[ArticleModel.collection.collectionName],
					}))
				)
			})
			.catch(console.log)
	})
}
