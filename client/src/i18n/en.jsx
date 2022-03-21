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
			others: 'Others',
			more: 'More',
		},
	},
	fields: {
		title: 'Title',
		description: 'Description',
		type: 'Type',
		year: 'Written in (year)',
		volume: 'Volume',
		authors: 'Authors',
		author: 'Author',
		character: 'Character',
		exitData: 'Exit data',
		file: 'File',
		search: 'Search by title',
	},
	resources: {
		articles: {
			titles: {
				create: 'Add article',
				list: 'Articles',
				show: 'View article',
				edit: 'Update article',
			},
		},
		abstracts: {},
		monographs: {},
		dissertations: {},
	},
}

export default messages
