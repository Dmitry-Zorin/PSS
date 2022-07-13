import defaultEnglishMessages from 'ra-language-english'
import type { TranslationMessages } from 'react-admin'

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
		description:
			'\
		This is a demo project showing what a storage system for scientific publications may look like.\
		Timeline. Here you can see all the recently added publications in their chronological order. \
		Authors. Here you can find the information about the authors and also download a list of all the publications for a specific author in the .docx format. \
			',
	},
	actions: {
		download: 'Download',
	},
	menu: {
		groups: {
			publications: 'Publications',
			admin: 'Administration',
		},
	},
	fields: {
		title: 'Title',
		description: 'Description',
		type: 'Type',
		year: 'Written in (year)',
		volume: 'Volume (pages)',
		authors: 'Authors',
		coauthors: 'Coauthors',
		coauthor: 'Coauthor',
		character: 'Character',
		outputData: 'Output data',
		file: 'File',
		search: 'Search',
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
	pages: {
		about: {
			name: 'About',
		},
	},
	publicationList: {
		name: 'Publication list',
	},
}

export default englishMessages
