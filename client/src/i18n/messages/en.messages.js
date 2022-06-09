import englishMessages from 'ra-language-english'

englishMessages.ra.action.show = 'View'

export const enMessages = {
	...englishMessages,
	metadata: {
		lang: 'English',
		title: 'Publication storage system',
	},
	menu: {
		publications: 'Publications',
		admin: 'Administration',
	},
	fields: {
		title: 'Title',
		description: 'Description',
		type: 'Type',
		year: 'Written in (year)',
		volume: 'Volume',
		authors: 'Authors',
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
		publicationList: {
			name: 'Create publications list',
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
