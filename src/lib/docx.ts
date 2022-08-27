import resources from 'constants/resources'
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
import { GetAuthorResponse } from 'server/services/author'

const categories = ['A', 'B', 'C'] as const

type Category = typeof categories[number]

const CATEGORY_TITLES: Record<Category, string> = {
	A: 'a) научные работы',
	B: 'б) авторские свидетельства, дипломы, патенты, лицензии, информационные карты, алгоритмы, проекты',
	C: 'в) учебно-методические работы',
}

const COLUMN_NAMES = [
	'№ п/п',
	'Наименование учебных изданий, научных трудов и патентов на изобретения и иные объекты интеллектуальной собственности',
	'Форма учебных изданий и научных трудов',
	'Выходные данные',
	'Объём',
	'Соавторы',
]

export function createDocx(author: GetAuthorResponse) {
	let index = 1

	function createPublicationRow(
		publication: GetAuthorResponse['publications'][number],
	) {
		return new TableRow({
			tableHeader: true,
			children: [
				new TableCell({
					children: [
						new Paragraph({
							text: (index++).toString(),
							alignment: AlignmentType.CENTER,
						}),
					],
				}),
				new TableCell({
					children: [
						new Paragraph(`${publication.title} (${publication.type})`),
					],
				}),
				new TableCell({
					children: [
						new Paragraph({
							text: '', // publication.characterId,
							alignment: AlignmentType.CENTER,
						}),
					],
				}),
				new TableCell({
					children: [
						new Paragraph(
							publication.extraData ||
								`${
									publication.publicationPlace
										? `${publication.publicationPlace}, `
										: ''
								}${publication.writtenInYear}`,
						),
					],
				}),
				new TableCell({
					children: [
						new Paragraph({
							text: publication.volumeInPages.toString(),
							alignment: AlignmentType.CENTER,
						}),
					],
				}),
				new TableCell({
					children: publication.coauthors?.map((e) => new Paragraph(e)),
				}),
			],
		})
	}

	function createCategoryRows(category: Category, isRecent = false) {
		const recentPostfix = ', опубликованные за последние три года'

		const categoryPublications = author.publications.filter((e) => {
			return (
				resources.publications[
					e.category as keyof typeof resources.publications
				].category === category
			)
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
							new Paragraph({
								text: `${CATEGORY_TITLES[category]}${
									isRecent ? recentPostfix : ''
								}`,
								alignment: AlignmentType.CENTER,
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
							children: [
								new Paragraph({ text: name, alignment: AlignmentType.CENTER }),
							],
						})
					}),
				}),
				new TableRow({
					children: COLUMN_NAMES.map((_, i) => {
						return new TableCell({
							children: [
								new Paragraph({
									text: (i + 1).toString(),
									alignment: AlignmentType.CENTER,
								}),
							],
						})
					}),
				}),
				...categories.flatMap((e) => createCategoryRows(e)),
			],
		})
	}

	function createDocument() {
		const heading1 = 'Форма №16'
		const heading2 = 'СПИСОК'
		const heading3 = 'научных и учебно-методических работ'
		const heading4 = author.fullName
		const footing1 = author.fullName
		const footing2 = `«__» ________ ${new Date().getFullYear()} г`

		return new Document({
			sections: [
				{
					children: [
						new Paragraph({
							text: heading1,
							heading: HeadingLevel.HEADING_3,
							alignment: AlignmentType.RIGHT,
						}),
						new Paragraph({
							text: heading2,
							heading: HeadingLevel.HEADING_1,
							alignment: AlignmentType.CENTER,
						}),
						new Paragraph({
							text: heading3,
							heading: HeadingLevel.HEADING_2,
							alignment: AlignmentType.CENTER,
						}),
						new Paragraph({
							text: heading4,
							heading: HeadingLevel.HEADING_2,
							alignment: AlignmentType.CENTER,
						}),
						createTable(),
						...(author.info
							? author.info.split(', ').map((e) => {
									return new Paragraph({
										text: e,
										heading: HeadingLevel.HEADING_2,
									})
							  })
							: []),
						new Paragraph({
							text: footing1,
							heading: HeadingLevel.HEADING_2,
							alignment: AlignmentType.RIGHT,
						}),
						new Paragraph({ text: footing2, heading: HeadingLevel.HEADING_2 }),
					],
				},
			],
		})
	}

	return Packer.toBlob(createDocument())
}
