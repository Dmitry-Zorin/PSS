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
		articles: {
			name: 'Статьи',
			titles: {
				create: 'Добавить статью',
				list: 'Список статей',
				show: 'Просмотр статьи',
				edit: 'Редактирование статьи',
			},
		},
		abstracts: {
			name: 'Авторефераты',
		},
		monographs: {
			name: 'Монографии',
		},
		dissertations: {
			name: 'Диссертации',
		},
	},
}

export default messages
