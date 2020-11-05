import {
	AlignmentType,
	Document,
	HeadingLevel,
	Packer,
	Paragraph,
	Table,
	TableCell,
	TableRow,
	TextRun,
	VerticalAlign,
	WidthType
} from 'docx'
import { saveAs } from 'file-saver'

const letterStack = [...'яюэьыъщшчцхфутсрпонмлкйизжёедгвба']
let index = 1

export const createForm16 = (data, name, author, title) => {
	const doc = new Document()

	doc.addSection({
		properties: {},
		margins: {
			top: 0,
			right: 500,
			bottom: 0,
			left: 500,
		},
		children: [
			new Paragraph({
				text: 'Форма N 16',
				alignment: AlignmentType.RIGHT
			}),
			new Paragraph({
				alignment: AlignmentType.CENTER,
				heading: HeadingLevel.HEADING_2,
				children: [
					new TextRun({
						text: 'СПИСОК',
						color: '000000'
					})
				]
			}),
			new Paragraph({
				alignment: AlignmentType.CENTER,
				heading: HeadingLevel.HEADING_3,
				children: [
					new TextRun({
						text: 'научных и учебно-методических работ',
						color: '000000'
					})
				]
			}),
			new Paragraph({
				alignment: AlignmentType.CENTER,
				heading: HeadingLevel.HEADING_3,
				children: [
					new TextRun({
						text: name.split(' ')[0],
						color: '000000',
						allCaps: true
					}),
					new TextRun({
						text: ` ${
							name.split(' ')
								.slice(1)
								.map(e => `${e[0].toUpperCase()}${e.slice(1)}`)
								.join(' ')
						}`,
						color: '000000'
					})
				]
			}),
			getTable(data, author, name),
			new Paragraph({
				alignment: AlignmentType.LEFT,
				children: [
					new TextRun({
						text: title
					}).break(),
				]
			}),
			new Paragraph({
				text: `${name.split(' ')[1][0].toUpperCase()}. ${author[0].toUpperCase()}${author.split(' ')[0].slice(1)}`,
				alignment: AlignmentType.RIGHT,
			})
		]
	})

	Packer.toBlob(doc).then(blob => {
		saveAs(blob, 'Справка (форма 16).docx')
	})
}

const getTable = (data, author, name) => (
	new Table({
		width: {
			size: 100,
			type: WidthType.PERCENTAGE
		},
		rows: [
			new TableRow({
				children: [
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						width: {
							size: 1,
							type: WidthType.DXA
						},
						children: [
							new Paragraph({
								text: '№ п/п',
								alignment: AlignmentType.CENTER
							})
						]
					}),
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						children: [
							new Paragraph({
								children: [
									new TextRun('Наименование работы,'),
									new TextRun('ее вид').break()
								],
								alignment: AlignmentType.CENTER
							})
						]
					}),
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						width: {
							size: 1,
							type: WidthType.DXA
						},
						children: [
							new Paragraph({
								text: 'Характер работы',
								alignment: AlignmentType.CENTER
							})
						]
					}),
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						children: [
							new Paragraph({
								text: 'Выходные данные',
								alignment: AlignmentType.CENTER
							})
						]
					}),
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						width: {
							size: 1,
							type: WidthType.DXA
						},
						children: [
							new Paragraph({
								text: 'Объем в п.л. или с.',
								alignment: AlignmentType.CENTER
							})
						]
					}),
					new TableCell({
						verticalAlign: VerticalAlign.CENTER,
						children: [
							new Paragraph({
								text: 'Соавторы',
								alignment: AlignmentType.CENTER
							})
						]
					})
				]
			}),
			new TableRow({
				children: [1, 2, 3, 4, 5, 6].map(i => (
					new TableCell({
						children: [
							new Paragraph({
								text: i.toString(),
								alignment: AlignmentType.CENTER
							})
						]
					})
				))
			}),
			...getDataTableRows(data, author, name)
		]
	})
)

const getDataTableRows = (data, author, name) => ([
	...(data.old.length ? (
		new TableRow({
			children: [
				new TableCell({
					columnSpan: 6,
					children: [
						new Paragraph({
							text: letterStack.pop() + ') научные работы',
							alignment: AlignmentType.CENTER
						})
					]
				})
			]
		})
	) : []),
	...data.old.map(e => getDataTableRow(author, name, e)),
	data.new.length && (
		new TableRow({
			children: [
				new TableCell({
					columnSpan: 6,
					children: [
						new Paragraph({
							text: letterStack.pop() + `) научные работы${
								data.old.length ? ' за последние три года' : ''
							}`,
							alignment: AlignmentType.CENTER
						})
					]
				})
			]
		})
	),
	...data.new.map(e => getDataTableRow(author, name, e))
])

const getDataTableRow = (author, name, e) => (
	new TableRow({
		tableHeader: true,
		children: [
			new TableCell({
				children: [
					new Paragraph({
						text: (index++).toString(),
						alignment: AlignmentType.CENTER
					})
				]
			}),
			new TableCell({
				children: [
					new Paragraph(e.headline)
				]
			}),
			new TableCell({
				children: [
					new Paragraph({
						text: 'Печатн.',
						alignment: AlignmentType.CENTER
					})
				]
			}),
			new TableCell({
				children: [
					new Paragraph(
						`${e.publicationPlace}, ${e.firstCreationDate.getFullYear()}`
					)
				]
			}),
			new TableCell({
				children: [
					new Paragraph({
						text: e.numberOfPages.toString(),
						alignment: AlignmentType.CENTER
					})
				]
			}),
			new TableCell({
				children: e.authors.map(a => a.author)
					.filter(a => !a.match(new RegExp(`^${author}$`, 'i')))
					.map(a => new Paragraph(a))
			})
		]
	})
)
