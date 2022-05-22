import { AlignmentType, Paragraph, TableCell, TableRow } from 'docx'

export const getTableRow = (e, index) => (
	new TableRow({
		tableHeader: true,
		children: [
			new TableCell({
				children: [
					new Paragraph({
						text: (index.value++).toString(),
						alignment: AlignmentType.CENTER,
					}),
				],
			}),
			new TableCell({
				children: [
					new Paragraph(`${e.title}${e.type ? ` (${e.type})` : ' '}`),
				],
			}),
			new TableCell({
				children: [
					new Paragraph({
						text: e.character,
						alignment: AlignmentType.CENTER,
					}),
				],
			}),
			new TableCell({
				children: [
					new Paragraph(
						e.outputData || (
							e.publicationPlace && e.publicationPlace !== '-'
								? `${e.publicationPlace}, ${e?.year}`
								: e.year?.toString() || ''
						),
					),
				],
			}),
			new TableCell({
				children: [
					new Paragraph({
						text: e.volume?.toString() || '',
						alignment: AlignmentType.CENTER,
					}),
				],
			}),
			new TableCell({
				children: e.coauthors?.map(a => (
					new Paragraph(a)
				)) || [],
			}),
		],
	})
)
