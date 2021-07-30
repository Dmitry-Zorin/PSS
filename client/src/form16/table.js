import {
	AlignmentType,
	Paragraph,
	Table,
	TableCell,
	TableRow,
	VerticalAlign,
	WidthType,
} from 'docx'
import range from 'just-range'
import { getTableRows } from './tableRows.js'

export const getTable = (data, author) => {
	const index = { value: 1 }
	
	return (
		new Table({
			width: {
				size: 100,
				type: WidthType.PERCENTAGE,
			},
			rows: [
				new TableRow({
					children: [
						new TableCell({
							verticalAlign: VerticalAlign.CENTER,
							width: {
								size: 1,
								type: WidthType.DXA,
							},
							children: [
								new Paragraph({
									text: '№ п/п',
									alignment: AlignmentType.CENTER,
								}),
							],
						}),
						new TableCell({
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									text: 'Наименование учебных изданий, научных трудов и патентов на изобретения и иные объекты интеллектуальной собственности',
									alignment: AlignmentType.CENTER,
								}),
							],
						}),
						new TableCell({
							verticalAlign: VerticalAlign.CENTER,
							width: {
								size: 1,
								type: WidthType.DXA,
							},
							children: [
								new Paragraph({
									text: 'Форма учебных изданий и научных трудов',
									alignment: AlignmentType.CENTER,
								}),
							],
						}),
						new TableCell({
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									text: 'Выходные данные',
									alignment: AlignmentType.CENTER,
								}),
							],
						}),
						new TableCell({
							verticalAlign: VerticalAlign.CENTER,
							width: {
								size: 1,
								type: WidthType.DXA,
							},
							children: [
								new Paragraph({
									text: 'Объём',
									alignment: AlignmentType.CENTER,
								}),
							],
						}),
						new TableCell({
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									text: 'Соавторы',
									alignment: AlignmentType.CENTER,
								}),
							],
						}),
					],
				}),
				new TableRow({
					children: range(6).map(i => (
						new TableCell({
							children: [
								new Paragraph({
									text: (i + 1).toString(),
									alignment: AlignmentType.CENTER,
								}),
							],
						})
					)),
				}),
				...getTableRows(data[0], author, index, 'a) научные работы'),
				...getTableRows(
					data[1],
					author,
					index,
					'б) авторские свидетельства, дипломы, патенты, лицензии, информационные карты, алгоритмы, проекты',
				),
				...getTableRows(
					data[2],
					author,
					index,
					'в) учебно-методические работы',
				),
			],
		})
	)
}
