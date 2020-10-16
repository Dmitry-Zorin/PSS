const { listParamsMiddleware } = require('../utils')
const cookieParser = require('cookie-parser')()
const auth = require('../auth').auth

const { AbstractModel } = require('./AbstractAPI')
const { ApprobationModel } = require('./ApprobationAPI')
const { ArticleModel } = require('./ArticleAPI')
const { DevelopmentWorkModel } = require('./DevelopmentWorkAPI')
const { PatentsModel } = require('./PatentsAPI')
const { ProgramModel } = require('./ProgramAPI')
const { ProjectsModel } = require('./ProjectsAPI')
const { RationalizationModel } = require('./RationalizationAPI')
const { ResearchModel } = require('./ResearchAPI')
const { VerificationModel } = require('./VerificationAPI')

const translations = {
	abstracts: 'Тезис доклада',
	approbations: 'Апробация',
	articles: 'Статья',
	developments: 'ОКР',
	patents: 'Патент',
	programs: 'Программа',
	projects: 'Инициативный проект',
	rationalizations: 'Рационализаторское предложение',
	researches: 'НИР',
	verifications: 'Испытание',
}

module.exports = app => {
	app.get(`/api/timeline`, cookieParser, auth, listParamsMiddleware, (req, res) => {
		const { sortField, sortOrder, rangeStart, rangeEnd, filter } = req.listParams
		const events = []

		Promise.all([
			AbstractModel,
			ApprobationModel,
			ArticleModel,
			//DevelopmentWorkModel,
			PatentsModel,
			ProgramModel,
			ProjectsModel,
			RationalizationModel,
			ResearchModel,
			VerificationModel,
		].map(model => (
			model.find(filter)
				.sort({ [sortField]: sortOrder })
				.then(data => {
					events.push(...data.map(e => ({
						id: e._id,
						title: e.headline,
						creationDate: e.firstCreationDate,
						type: model.collection.collectionName,
						translation: translations[model.collection.collectionName],
					})))
				})
				.catch(console.log)
		)))
			.then(() => {
				const contentLength = `timeline ${rangeStart}-${rangeEnd - 1}/${events.length}`
				res.set('Content-Range', contentLength)
					.send(events.slice(rangeStart, rangeEnd))
			})
			.catch(console.log)
	})
}
