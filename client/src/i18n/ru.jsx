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
			more: 'Прочее',
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
		character: 'Характер работы',
		exitData: 'Выходные данные',
		file: 'Файл',
		search: 'Поиск по названию',
	},
	resources: {
		resources: {
			name: 'События'
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
	},
}

export default messages
