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
	resources: {
		articles: {
			name: 'Статьи',
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
			},
			titles: {
				create: 'Добавить статью',
				edit: 'Редактирование статьи',
				show: 'Просмотр статьи',
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
