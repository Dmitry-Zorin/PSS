import englishMessages from 'ra-language-english'

const messages = {
	...englishMessages,
	layout: {
		menu: {
			category1: 'Category A',
			category2: 'Category B',
			category3: 'Category C',
			others: 'Others',
			more: 'More',
		},
	},
	resources: {
		subdivisions: {
			name: 'Subdivisions',
		},
		library: {
			name: 'Library',
			create: 'Book added',
			edit: 'Book updated',
		},
		employee: {
			name: 'Employees',
			create: 'Employee added',
			edit: 'Employee updated',
		},
		platoon: {
			name: 'Groups',
			create: 'Group added',
			edit: 'Group updated',
		},
	},
}

export default messages
