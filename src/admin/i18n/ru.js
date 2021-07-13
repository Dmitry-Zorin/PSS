import russianMessages from 'ra-language-russian'

const messages = {
	...russianMessages,
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
			name: 'Взвода',
			create: 'Взвод добавлен',
			edit: 'Взвод обновлен',
		},
		other: 'Прочее',
		category1: 'Категория А',
		category2: 'Категория Б',
		category3: 'Категория В',
		rest: 'Другие',
	},
}

export default messages
