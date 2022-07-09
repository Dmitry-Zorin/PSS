import defaultEnglishMessages from 'ra-language-english'
import { TranslationMessages } from 'react-admin'

const englishMessages: TranslationMessages = {
	...defaultEnglishMessages,
	ra: {
		...defaultEnglishMessages.ra,
		action: {
			...defaultEnglishMessages.ra.action,
			show: 'View',
		},
	},
	metadata: {
		title: 'Publication Storage System',
	},
	pages: {
		about: 'About',
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
		'create-publication-list': {
			name: 'Create publication list',
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

export default englishMessages