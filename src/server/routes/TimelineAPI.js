const { listParamsMiddleware } = require('../utils')
const cookieParser = require('cookie-parser')()
const auth = require('../auth').auth

const resources = {
	abstracts: {
		model: require('./AbstractAPI').AbstractModel,
		translation: 'Тезис доклада',
		wordGender: 'masculine'
	},
	approbations: {
		model: require('./ApprobationAPI').ApprobationModel,
		translation: 'Апробация',
		wordGender: 'feminine'
	},
	articles: {
		model: require('./ArticleAPI').ArticleModel,
		translation: 'Статья',
		wordGender: 'feminine'
	},
	developments: {
		model: require('./DevelopmentWorkAPI').DevelopmentWork,
		translation: 'ОКР',
		wordGender: 'feminine'
	},
	patents: {
		model: require('./PatentsAPI').PatentsModel,
		translation: 'Патент',
		wordGender: 'masculine'
	},
	programs: {
		model: require('./ProgramAPI').ProgramModel,
		translation: 'Программа',
		wordGender: 'feminine'
	},
	projects: {
		model: require('./ProjectsAPI').ProjectsModel,
		translation: 'Инициативный проект',
		wordGender: 'masculine'
	},
	rationalizations: {
		model: require('./RationalizationAPI').RationalizationModel,
		translation: 'Рационализаторское предложение',
		wordGender: 'neuter'
	},
	researches: {
		model: require('./ResearchAPI').ResearchModel,
		translation: 'НИР',
		wordGender: 'feminine'
	},
	verifications: {
		model: require('./VerificationAPI').VerificationModel,
		translation: 'Испытание',
		wordGender: 'neuter'
	},
}

module.exports = (app) => {
	app.get(`/api/timeline`, cookieParser, auth, listParamsMiddleware, (req, res) => {
		const { sortField, sortOrder, rangeStart, rangeEnd, filter } = req.listParams
		const events = []

		Promise.all(Object.values(resources).map(r => (
			r.model.find(filter)
				.sort({ [sortField]: sortOrder })
				.then(data => {
					events.push(...data.map(e => ({
						id: e._id,
						title: e.headline,
						creationDate: e.firstCreationDate,
						type: r.model.collection.collectionName,
						translation: r.translation,
						wordGender: r.wordGender
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
