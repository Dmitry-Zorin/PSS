import dataProvider from 'data.provider'
import {
	AlignmentType,
	Document,
	HeadingLevel,
	Packer,
	Paragraph,
	Table,
	TableCell,
	TableRow,
	VerticalAlign,
	WidthType,
} from 'docx'
import { fetchApi } from 'requests'
import { Author, getAuthorName, Publication } from './CreatePublicationList'

enum Category {
	A = 'A',
	B = 'B',
	C = 'C',
}

const CATEGORY_TITLES = {
	[Category.A]: 'a) научные работы',
	[Category.B]:
		'б) авторские свидетельства, дипломы, патенты, лицензии, информационные карты, алгоритмы, проекты',
	[Category.C]: 'в) учебно-методические работы',
}

const COLUMN_NAMES = [
	'№ п/п',
	'Наименование учебных изданий, научных трудов и патентов на изобретения и иные объекты интеллектуальной собственности',
	'Форма учебных изданий и научных трудов',
	'Выходные данные',
	'Объём',
	'Соавторы',
]

export type Categories = Record<Category, string[]>

const P = Paragraph
const { CENTER, RIGHT } = AlignmentType
const { HEADING_1, HEADING_2, HEADING_3 } = HeadingLevel

export async function createDocx(author: Author) {
	let index = 1

	const { data: publications } = await dataProvider.getMany<Publication>(
		'publications',
		{ ids: [author.id] },
	)

	const { json: categories }: { json: Categories } = await fetchApi(
		'resources/categories',
	)

	const authorName = getAuthorName(author)

	function createPublicationRow(publication: Publication) {
		return new TableRow({
			tableHeader: true,
			children: [
				new TableCell({
					children: [new P({ text: (index++).toString(), alignment: CENTER })],
				}),
				new TableCell({
					children: [
						new P(
							`${publication.title}${
								publication.type ? ` (${publication.type})` : ''
							}`,
						),
					],
				}),
				new TableCell({
					children: [
						new P({ text: publication.characterId, alignment: CENTER }),
					],
				}),
				new TableCell({
					children: [
						new P(
							publication.outputData ||
								`${publication.publicationPlace}, ${publication?.year}`,
						),
					],
				}),
				new TableCell({
					children: [
						new P({ text: publication.volume?.toString(), alignment: CENTER }),
					],
				}),
				new TableCell({
					children: publication.coauthors?.map((e) => new P(e)),
				}),
			],
		})
	}

	function createCategoryRows(category: Category, isRecent = false) {
		const recentPostfix = ', опубликованные за последние три года'

		const categoryPublications = categories[category].flatMap((resource) => {
			return publications.filter((e) => e.resourceItemId === resource)
		})

		if (!categoryPublications.length) {
			return []
		}

		return [
			new TableRow({
				children: [
					new TableCell({
						columnSpan: 6,
						children: [
							new P({
								text: `${CATEGORY_TITLES[category]}${
									isRecent ? recentPostfix : ''
								}`,
								alignment: CENTER,
							}),
						],
					}),
				],
			}),
			...categoryPublications.map(createPublicationRow),
		]
	}

	function createTable() {
		return new Table({
			width: { size: 100, type: WidthType.PERCENTAGE },
			rows: [
				new TableRow({
					children: COLUMN_NAMES.map((name) => {
						return new TableCell({
							verticalAlign: VerticalAlign.CENTER,
							width: { size: 1, type: WidthType.DXA },
							children: [new P({ text: name, alignment: CENTER })],
						})
					}),
				}),
				new TableRow({
					children: COLUMN_NAMES.map((_, i) => {
						return new TableCell({
							children: [
								new P({ text: (i + 1).toString(), alignment: CENTER }),
							],
						})
					}),
				}),
				...Object.keys(categories).flatMap((e) => {
					return createCategoryRows(e as Category)
				}),
			],
		})
	}

	function createDocument() {
		const heading1 = 'Форма №16'
		const heading2 = 'СПИСОК'
		const heading3 = 'научных и учебно-методических работ'
		const heading4 = authorName
		const footing1 = authorName
		const footing2 = `«__» ________ ${new Date().getFullYear()} г`

		return new Document({
			sections: [
				{
					children: [
						new P({ text: heading1, heading: HEADING_3, alignment: RIGHT }),
						new P({ text: heading2, heading: HEADING_1, alignment: CENTER }),
						new P({ text: heading3, heading: HEADING_2, alignment: CENTER }),
						new P({ text: heading4, heading: HEADING_2, alignment: CENTER }),
						createTable(),
						...author.info.split(', ').map((e) => {
							return new P({ text: e, heading: HEADING_2 })
						}),
						new P({ text: footing1, heading: HEADING_2, alignment: RIGHT }),
						new P({ text: footing2, heading: HEADING_2 }),
					],
				},
			],
		})
	}

	return Packer.toBlob(createDocument())
}
