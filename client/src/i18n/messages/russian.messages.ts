import defaultRussianMessages from 'ra-language-russian'
import { TranslationMessages } from 'react-admin'

const russianMessages: TranslationMessages = {
	...defaultRussianMessages,
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
		},
		abstracts: {
			name: 'Автореферат |||| Авторефераты',
		},
		monographs: {
			name: 'Монография |||| Монографии',
		},
		dissertations: {
			name: 'Диссертация |||| Диссертации',
		},
		patents: {
			name: 'Патент |||| Патенты',
		},
		reports: {
			name: 'Отчет |||| Отчеты',
		},
		programs: {
			name: 'Программа |||| Программы',
		},
		textbooks: {
			name: 'Учебник |||| Учебники',
		},
		authors: {
			name: 'Автор |||| Авторы',
		},
		characters: {
			name: 'Характер работы |||| Характеры работы',
		},
	},
}

export default russianMessages
