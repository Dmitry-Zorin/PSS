const { listParamsMiddleware } = require('../utils')

const resources = {
	monographs: {
		model: require('./MonographAPI').ArticleModel,
		translation: 'Монография',
		wordGender: 'feminine',
	},
	abstracts: {
		model: require('./AbstractAPI').ArticleModel,
		translation: 'Афтореферат',
		wordGender: 'masculine',
	},
	dissertations: {
		model: require('./DissertationAPI').ArticleModel,
		translation: 'Диссертация',
		wordGender: 'feminine',
	},
	reports: {
		model: require('./ReportAPI').ArticleModel,
		translation: 'Отчет',
		wordGender: 'masculine',
	},
	textbooks: {
		model: require('./TextbookAPI').ArticleModel,
		translation: 'Учебник',
		wordGender: 'masculine',
	},
	theses: {
		model: require('./ThesisAPI').ArticleModel,
		translation: 'Тезис доклада',
		wordGender: 'masculine',
	},
	approbations: {
		model: require('./ApprobationAPI').ApprobationModel,
		translation: 'Апробация',
		wordGender: 'feminine',
	},
	articles: {
		model: require('./ArticleAPI').ArticleModel,
		translation: 'Статья',
		wordGender: 'feminine',
	},
	developments: {
		model: require('./DevelopmentAPI').DevelopmentWork,
		translation: 'ОКР',
		wordGender: 'feminine',
	},
	patents: {
		model: require('./PatentsAPI').PatentsModel,
		translation: 'Патент',
		wordGender: 'masculine',
	},
	programs: {
		model: require('./ProgramAPI').ProgramModel,
		translation: 'Программа',
		wordGender: 'feminine',
	},
	projects: {
		model: require('./ProjectsAPI').ProjectsModel,
		translation: 'Инициативный проект',
		wordGender: 'masculine',
	},
	rationalizations: {
		model: require('./RationalizationAPI').RationalizationModel,
		translation: 'Рацпредложение',
		wordGender: 'neuter',
	},
	researches: {
		model: require('./ResearchAPI').ResearchModel,
		translation: 'НИР',
		wordGender: 'feminine',
	},
	verifications: {
		model: require('./VerificationAPI').VerificationModel,
		translation: 'Испытание',
		wordGender: 'neuter',
	},
}

module.exports = (app) => {
	app.get(`/api/timeline`, listParamsMiddleware, async (req, res, next) => {
			const {
				sortField,
				sortOrder,
				rangeStart,
				rangeEnd,
				filter,
			} = req.listParams
			const events = []
			
			try {
				for (const resource of Object.values(resources)) {
					const record = await resource.model
						.find(filter)
						.sort({ [sortField]: sortOrder })
						.exec()
					
					events.push(...record.map(e => (
						{
							id: e._id,
							title: e.headline,
							creationDate: e.firstCreationDate,
							type: resource.model.collection.collectionName,
							translation: resource.translation,
							wordGender: resource.wordGender,
						}
					)))
				}
				
				res
					.set('Content-Range',
						`timeline ${rangeStart}-${rangeEnd - 1}/${events.length}`)
					.send(events
						.sort((a, b) => b.creationDate - a.creationDate)
						.slice(rangeStart, rangeEnd),
					)
			}
			catch (err) {
				next(err)
			}
		})
}
