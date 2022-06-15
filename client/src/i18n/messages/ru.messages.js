import russianMessages from 'ra-language-russian'

export const ruMessages = {
	...russianMessages,
	metadata: {
		title: 'Системa хранения публикаций',
	},
	pages: {
		about: 'О системе',
	},
	menu: {
		publications: 'Публикации',
		admin: 'Администрирование',
	},
	fields: {
		title: 'Название',
		description: 'Описание',
		type: 'Тип работы',
		year: 'Год создания',
		volume: 'Объем',
		authors: 'Авторы',
		coauthors: 'Соавторы',
		coauthor: 'Соавтор',
		character: 'Характер работы',
		outputData: 'Выходные данные',
		file: 'Файл',
		search: 'Поиск по названию',
		name: 'Название',
		firstName: 'Имя',
		lastName: 'Фамилия',
		middleName: 'Отчество',
		info: 'Дополнительная информация',
	},
	resources: {
		timeline: {
			name: 'События',
		},
		'create-publication-list': {
			name: 'Cоздать список публикаций',
		},
		articles: {
			name: 'Статья |||| Статьи',
			created: 'добавлена',
		},
		abstracts: {
			name: 'Автореферат |||| Авторефераты',
			created: 'добавлен',
		},
		monographs: {
			name: 'Монография |||| Монографии',
			created: 'добавлена',
		},
		dissertations: {
			name: 'Диссертация |||| Диссертации',
			created: 'добавлена',
		},
		patents: {
			name: 'Патент |||| Патенты',
			created: 'добавлен',
		},
		reports: {
			name: 'Отчет |||| Отчеты',
			created: 'добавлена',
		},
		programs: {
			name: 'Программа |||| Программы',
			created: 'добавлена',
		},
		textbooks: {
			name: 'Учебник |||| Учебники',
			created: 'добавлена',
		},
		authors: {
			name: 'Автор |||| Авторы',
		},
		characters: {
			name: 'Характер работы |||| Характеры работы',
		},
	},
}
