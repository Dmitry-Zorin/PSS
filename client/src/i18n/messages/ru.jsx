import russianMessages from 'ra-language-russian'

const messages = {
	...russianMessages,
	metadata: {
		lang: 'Русский',
		title: 'Системa хранения научных трудов',
	},
	layout: {
		menu: {
			categoryA: 'Категория А',
			categoryB: 'Категория Б',
			categoryC: 'Категория В',
			others: 'Другие',
			admin: 'Администрирование',
		},
	},
	fields: {
		title: 'Название',
		description: 'Описание',
		type: 'Тип работы',
		year: 'Год создания',
		volume: 'Объем',
		authors: 'Авторы',
		author: 'Автор',
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
		publicationsList: {
			name: 'Список публикаций',
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

export default messages
