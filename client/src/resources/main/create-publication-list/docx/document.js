import { AlignmentType, Document, HeadingLevel, Paragraph, TextRun } from 'docx'
import { getTable } from './table'

export const getDocument = (data, name, title) => {
	return new Document({
		sections: [
			{
				children: [
					new Paragraph({
						alignment: AlignmentType.RIGHT,
						heading: HeadingLevel.HEADING_3,
						children: [
							new TextRun({
								text: 'Форма №16',
								color: '000000',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.CENTER,
						heading: HeadingLevel.HEADING_1,
						children: [
							new TextRun({
								text: 'СПИСОК',
								color: '000000',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.CENTER,
						heading: HeadingLevel.HEADING_2,
						children: [
							new TextRun({
								text: 'научных и учебно-методических работ',
								color: '000000',
							}),
						],
					}),
					/\./.test(name)
						? undefined
						: new Paragraph({
								alignment: AlignmentType.CENTER,
								heading: HeadingLevel.HEADING_2,
								children: [
									new TextRun({
										text: name.split(' ')[0],
										color: '000000',
										allCaps: true,
									}),
									new TextRun({
										text: ` ${name
											.split(' ')
											.slice(1)
											.map((e) => `${e[0].toUpperCase()}${e.slice(1)}`)
											.join(' ')}`,
										color: '000000',
									}),
								],
						  }),
					new Paragraph({}),
					getTable(data),
					new Paragraph({}),
					...title.split(', ').map(
						(e) =>
							new Paragraph({
								heading: HeadingLevel.HEADING_2,
								children: [
									new TextRun({
										text: e,
										color: '000000',
									}),
								],
							}),
					),
					new Paragraph({
						alignment: AlignmentType.RIGHT,
						heading: HeadingLevel.HEADING_2,
						children: [
							new TextRun({
								text: `${name
									.split(' ')[1][0]
									.toUpperCase()}. ${name[0].toUpperCase()}${name
									.split(' ')[0]
									.slice(1)}`,
								color: '000000',
							}),
						],
					}),
					new Paragraph({
						heading: HeadingLevel.HEADING_2,
						children: [
							new TextRun({
								text: `«___» __________ ${new Date().getFullYear()} г`,
								color: '000000',
							}),
						],
					}),
				],
			},
		],
	})
}
