import englishMessages from 'ra-language-english'

const messages = {
	...englishMessages,
	metadata: {
		lang: 'English',
		title: 'Scientific works storage system',
	},
	layout: {
		menu: {
			categoryA: 'Category A',
			categoryB: 'Category B',
			categoryC: 'Category C',
			others: 'Others',
			admin: 'Administration',
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
		coauthors: 'Coauthors',
		coauthor: 'Coauthor',
		character: 'Character',
		outputData: 'Output data',
		file: 'File',
		search: 'Search by title',
		name: 'Name',
		firstName: 'First Name',
		lastName: 'Last name',
		middleName: 'Middle name',
		info: 'Info',
	},
	resources: {
		timeline: {
			name: 'Timeline',
		},
		publicationsList: {
			name: 'List of publications',
		},
		articles: {
			name: 'Article |||| Articles',
		},
		abstracts: {
			name: 'Abstract |||| Abstracts',
		},
		monographs: {
			name: 'Monograph |||| Monographs',
		},
		dissertations: {
			name: 'Dissertation |||| Dissertations',
		},
		patents: {
			name: 'Patent |||| Patents',
		},
		reports: {
			name: 'Report |||| Reports',
		},
		programs: {
			name: 'Program |||| Programs',
		},
		textbooks: {
			name: 'Textbook |||| Textbooks',
		},
		authors: {
			name: 'Author |||| Authors',
		},
		characters: {
			name: 'Character |||| Characters',
		},
	},
}

export default messages
