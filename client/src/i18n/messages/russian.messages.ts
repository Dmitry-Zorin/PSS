import defaultRussianMessages from 'ra-language-russian'
import { TranslationMessages } from 'react-admin'

const russianMessages: TranslationMessages = {
	...defaultRussianMessages,
	metadata: {
		title: 'Системa хранения публикаций',
		description:
			'\
		Данный проект является демонстрацией того, как может выглядесть система для хранения научных публикаций.\
		События. В этом разделе можно увидеть все недавно добавленные публикации в их хронологическом порядке. \
		Авторы. Здесь можно найти информацию об авторах, а также скачать список всех публикаций конкретного автора в .docx формате. \
			',
	},
	actions: {
		download: 'Скачать',
	},
	menu: {
		groups: {
			publications: 'Публикации',
			admin: 'Администрирование',
		},
	},
	fields: {
		title: 'Название',
		description: 'Описание',
		type: 'Тип работы',
		year: 'Год создания',
		volume: 'Объем (страницы)',
		authors: 'Авторы',
		coauthors: 'Соавторы',
		coauthor: 'Соавтор',
		character: 'Характер работы',
		outputData: 'Выходные данные',
		file: 'Файл',
		search: 'Поиск',
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
	pages: {
		about: {
			name: 'О системе',
		},
	},
	publicationList: {
		name: 'Список публикаций',
	},
}

export default russianMessages
