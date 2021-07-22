const { listParamsMiddleware }
from
..
/utils')

const resources = {
	monographs: {
		model: require('./MonographAPI.js').ArticleModel,
		translation: 'Монография',
		wordGender: 'feminine',
	},
	abstracts: {
		model: require('./AbstractAPI.js').ArticleModel,
		translation: 'Афтореферат',
		wordGender: 'masculine',
	},
	dissertations: {
		model: require('./DissertationAPI.js').ArticleModel,
		translation: 'Диссертация',
		wordGender: 'feminine',
	},
	reports: {
		model: require('./ReportAPI.js').ArticleModel,
		translation: 'Отчет',
		wordGender: 'masculine',
	},
	textbooks: {
		model: require('./TextbookAPI.js').ArticleModel,
		translation: 'Учебник',
		wordGender: 'masculine',
	},
	theses: {
		model: require('./ThesisAPI.js').ArticleModel,
		translation: 'Тезис доклада',
		wordGender: 'masculine',
	},
	approbations: {
		model: require('./ApprobationAPI.js').ApprobationModel,
		translation: 'Апробация',
		wordGender: 'feminine',
	},
	articles: {
		model: require('./ArticleAPI.js').ArticleModel,
		translation: 'Статья',
		wordGender: 'feminine',
	},
	developments: {
		model: require('./DevelopmentAPI.js').DevelopmentWork,
		translation: 'ОКР',
		wordGender: 'feminine',
	},
	patents: {
		model: require('./PatentsAPI.js').PatentsModel,
		translation: 'Патент',
		wordGender: 'masculine',
	},
	programs: {
		model: require('./ProgramAPI.js').ProgramModel,
		translation: 'Программа',
		wordGender: 'feminine',
	},
	projects: {
		model: require('./ProjectsAPI.js').ProjectsModel,
		translation: 'Инициативный проект',
		wordGender: 'masculine',
	},
	rationalizations: {
		model: require('./RationalizationAPI.js').RationalizationModel,
		translation: 'Рацпредложение',
		wordGender: 'neuter',
	},
	researches: {
		model: require('./ResearchAPI.js').ResearchModel,
		translation: 'НИР',
		wordGender: 'feminine',
	},
	verifications: {
		model: require('./VerificationAPI.js').VerificationModel,
		translation: 'Испытание',
		wordGender: 'neuter',
	},
}

export default (app) => {
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