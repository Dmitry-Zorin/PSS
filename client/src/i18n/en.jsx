import englishMessages from 'ra-language-english'

const messages = {
	...englishMessages,
	metadata: {
		lang: 'English',
		title: 'Scientific works storage system',
	},
	layout: {
		menu: {
			category1: 'Category A',
			category2: 'Category B',
			category3: 'Category C',
		},
	},
	resources: {
		articles: {
			fields: {
				year: 'Written in (year)',
				author: 'Author',
			},
			titles: {
				create: 'Add article',
			},
		},
		abstracts: {},
		monographs: {},
		dissertations: {},
	},
}

export default messages
