import russianMessages from 'ra-language-russian'

const messages = {
	...russianMessages,
	layout: {
		menu: {
			category1: 'Категория А',
			category2: 'Категория Б',
			category3: 'Категория В',
			others: 'Другие',
			more: 'Прочее',
		},
	},
	resources: {
		subdivisions: {
			name: 'Подразделения',
		},
		library: {
			name: 'Библиотека',
			create: 'Книга добавлена',
			edit: 'Книга обновлена',
		},
		employee: {
			name: 'Сотрудники',
			create: 'Сотрудник добавлен',
			edit: 'Сотрудник обновлен',
		},
		platoon: {
			name: 'Группы',
			create: 'Группа добавлена',
			edit: 'Группа обновлена',
		},
	},
}

export default messages
