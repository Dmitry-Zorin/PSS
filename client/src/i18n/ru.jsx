import russianMessages from 'ra-language-russian'

const messages = {
	...russianMessages,
	metadata: {
		lang: 'Русский',
		title: 'Системa хранения научных трудов',
	},
	layout: {
		menu: {
			category1: 'Категория А',
			category2: 'Категория Б',
			category3: 'Категория В',
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
			titles: {
				create: 'Добавить статью',
				list: 'Список статей',
				show: 'Просмотр статьи',
				edit: 'Редактирование статьи',
			},
			created: 'добавлена',
		},
		abstracts: {
			name: 'Автореферат |||| Авторефераты',
			titles: {
				create: 'Добавить статью',
				list: 'Список статей',
				show: 'Просмотр статьи',
				edit: 'Редактирование статьи',
			},
			created: 'добавлен',
		},
		monographs: {
			name: 'Монография |||| Монографии',
			titles: {
				create: 'Добавить статью',
				list: 'Список статей',
				show: 'Просмотр статьи',
				edit: 'Редактирование статьи',
			},
			created: 'добавлена',
		},
		dissertations: {
			name: 'Диссертация |||| Диссертации',
			titles: {
				create: 'Добавить статью',
				list: 'Список статей',
				show: 'Просмотр статьи',
				edit: 'Редактирование статьи',
			},
			created: 'добавлена',
		},
		patents: {
			name: 'Патент |||| Патенты',
			titles: {
				create: 'Добавить патент',
				list: 'Список патентов',
				show: 'Просмотр патента',
				edit: 'Редактирование патента',
			},
		},
		reports: {
			name: 'Отчет |||| Отчеты',
			titles: {
				create: 'Добавить отчет',
				list: 'Список отчетов',
				show: 'Просмотр отчета',
				edit: 'Редактирование отчета',
			},
		},
		programs: {
			name: 'Программа |||| Программы',
			titles: {
				create: 'Добавить программу',
				list: 'Список программ',
				show: 'Просмотр программы',
				edit: 'Редактирование программы',
			},
		},
		textbooks: {
			name: 'Учебник |||| Учебники',
			titles: {
				create: 'Добавить учебник',
				list: 'Список учебников',
				show: 'Просмотр учебника',
				edit: 'Редактирование учебника',
			},
		},
		authors: {
			name: 'Автор |||| Авторы',
			titles: {
				create: 'Добавить автора',
				list: 'Список авторов',
				show: 'Информация об авторе',
				edit: 'Редактирование информации об авторе',
			},
		},
		characters: {
			name: 'Характер работы |||| Характеры работы',
			titles: {
				create: 'Добавить характер',
				list: 'Список характеров',
				edit: 'Редактирование характера',
			},
		},
	},
}

export default messages
