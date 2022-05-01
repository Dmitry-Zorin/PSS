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
		outputData: 'Output data',
		file: 'File',
		search: 'Search by title',
		name: 'Name',
		firstName: 'First Name',
		lastName: 'Last name',
		middleName: 'Middle name',
		info: 'Info'
	},
	resources: {
		timeline: {
			name: 'Timeline'
		},
		publicationsList: {
			name: 'List of publications'
		},
		articles: {
			name: 'Article |||| Articles',
			titles: {
				create: 'Add article',
				list: 'Articles',
				show: 'View article',
				edit: 'Update article',
			},
		},
		abstracts: {
			name: 'Abstract |||| Abstracts',
			titles: {
				create: 'Add article',
				list: 'Articles',
				show: 'View article',
				edit: 'Update article',
			},
		},
		monographs: {
			name: 'Monograph |||| Monographs',
			titles: {
				create: 'Add article',
				list: 'Articles',
				show: 'View article',
				edit: 'Update article',
			},
		},
		dissertations: {
			name: 'Dissertation |||| Dissertations',
			titles: {
				create: 'Add article',
				list: 'Articles',
				show: 'View article',
				edit: 'Update article',
			},
		},
		patents: {
			name: 'Patent |||| Patents',
			titles: {
				create: 'Add patent',
				list: 'Patents',
				show: 'View patent',
				edit: 'Update patent',
			},
		},
		reports: {
			name: 'Report |||| Reports',
			titles: {
				create: 'Add report',
				list: 'Reports',
				show: 'View report',
				edit: 'Update report',
			},
		},
		programs: {
			name: 'Program |||| Programs',
			titles: {
				create: 'Add program',
				list: 'Programs',
				show: 'View program',
				edit: 'Update program',
			},
		},
		textbooks: {
			name: 'Textbook |||| Textbooks',
			titles: {
				create: 'Add textbook',
				list: 'Textbooks',
				show: 'View textbook',
				edit: 'Update textbook',
			},
		},
		authors: {
			name: 'Author |||| Authors',
			titles: {
				create: 'Add author',
				list: 'Authors',
				show: 'View author',
				edit: 'Update author',
			},
		},
		characters: {
			name: 'Character |||| Characters',
			titles: {
				create: 'Add character',
				list: 'Characters',
				edit: 'Update character'
			},
		}
	},
}

export default messages
