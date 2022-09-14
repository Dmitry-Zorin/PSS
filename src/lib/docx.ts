import resources, { Resources } from 'constants/resources'
import {
	AlignmentType,
	Document,
	HeadingLevel,
	IParagraphOptions,
	ITableCellOptions,
	Packer,
	Paragraph,
	Table,
	TableCell,
	TableRow,
	TextRun,
	VerticalAlign,
	WidthType,
} from 'docx'
import { GetAuthorResponse, UpdateAuthorResponse } from 'server/services/author'

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

function createParagraph({ text, ...options }: IParagraphOptions) {
	return new Paragraph({
		...(text && {
			children: [
				new TextRun({
					text: text,
					color: '000000',
				}),
			],
		}),
		...options,
	})
}

function createTableCell(options: ITableCellOptions) {
	const spacing = 100
	return new TableCell({
		margins: {
			top: spacing,
			bottom: spacing,
			left: spacing,
			right: spacing,
		},
		...options,
	})
}

export function createDocx(author: GetAuthorResponse | UpdateAuthorResponse) {
	let index = 1

	function createPublicationRow(
		publication: GetAuthorResponse['publications'][number],
	) {
		return new TableRow({
			tableHeader: true,
			children: [
				createTableCell({
					children: [
						new Paragraph({
							text: (index++).toString(),
							alignment: AlignmentType.CENTER,
						}),
					],
				}),
				createTableCell({
					children: [
						new Paragraph(`${publication.title} (${publication.typeName})`),
					],
				}),
				createTableCell({
					children: [
						new Paragraph({
							text: publication.publicationForm ?? '-',
							alignment: AlignmentType.CENTER,
						}),
					],
				}),
				createTableCell({
					children: [
						new Paragraph(
							`${
								publication.publicationPlace
									? `${publication.publicationPlace}, `
									: ''
							}${publication.publicationYear}`,
						),
					],
				}),
				createTableCell({
					children: [
						new Paragraph({
							text: publication.pageCount.toString(),
							alignment: AlignmentType.CENTER,
						}),
					],
				}),
				createTableCell({
					children: [
						...publication.authors
							.filter((e) => e.id !== author.id)
							.map((e) => new Paragraph(`${e.fullName},`)),
						...publication.coauthors?.map((e) => new Paragraph(`${e},`)),
					],
				}),
			],
		})
	}

	function createCategoryRows(category: Category) {
		const categoryPublications = author.publications.filter((e) => {
			return (
				resources.publications.items[
					e.type as keyof Resources['publications']['items']
				].category === category
			)
		})

		if (!categoryPublications.length) {
			return []
		}

		return [
			new TableRow({
				children: [
					createTableCell({
						columnSpan: 6,
						children: [
							new Paragraph({
								text: CATEGORY_TITLES[category],
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
						return createTableCell({
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
						return createTableCell({
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
		const names = author.fullName.split(' ')

		const heading1 = 'Форма №16'
		const heading2 = 'СПИСОК'
		const heading3 = 'научных и учебно-методических работ'
		const heading4 = `${names[0].toUpperCase()} ${names.slice(1).join(' ')}`
		const footing1 = `${names[0]} ${names
			.map((e) => `${e[0].toUpperCase()}.`)
			.slice(1)
			.join('')}`
		const footing2 = `«__» ________ ${new Date().getFullYear()} г`

		return new Document({
			sections: [
				{
					children: [
						createParagraph({
							text: heading1,
							heading: HeadingLevel.HEADING_3,
							alignment: AlignmentType.RIGHT,
						}),
						createParagraph({}),
						createParagraph({
							text: heading2,
							heading: HeadingLevel.HEADING_1,
							alignment: AlignmentType.CENTER,
							spacing: { after: 50 },
						}),
						createParagraph({
							text: heading3,
							heading: HeadingLevel.HEADING_2,
							alignment: AlignmentType.CENTER,
						}),
						createParagraph({
							text: heading4,
							heading: HeadingLevel.HEADING_2,
							alignment: AlignmentType.CENTER,
							spacing: { before: 100 },
						}),
						createParagraph({}),
						createTable(),
						createParagraph({}),
						createParagraph({
							text: footing1,
							heading: HeadingLevel.HEADING_2,
							alignment: AlignmentType.RIGHT,
						}),
						createParagraph({}),
						createParagraph({
							text: footing2,
							heading: HeadingLevel.HEADING_2,
							alignment: AlignmentType.RIGHT,
						}),
						createParagraph({}),
					],
				},
			],
		})
	}

	return Packer.toBlob(createDocument())
}
