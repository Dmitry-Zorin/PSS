import {AlignmentType, Paragraph, TableCell, TableRow} from "docx"

export const getTableRow = (author, e, index) => (
    new TableRow({
        tableHeader: true,
        children: [
            new TableCell({
                children: [
                    new Paragraph({
                        text: (index.value++).toString(),
                        alignment: AlignmentType.CENTER
                    })
                ]
            }),
            new TableCell({
                children: [
                    new Paragraph(`${e.headline} (${e.type})`)
                ]
            }),
            new TableCell({
                children: [
                    new Paragraph({
                        text: e.character,
                        alignment: AlignmentType.CENTER
                    })
                ]
            }),
            new TableCell({
                children: [
                    new Paragraph(
                        e.exitData || (
                            e.publicationPlace && e.publicationPlace !== '-'
                                ? `${e.publicationPlace}, ${e.creationDate}`
                                : e.creationDate.toString()
                        )
                    )
                ]
            }),
            new TableCell({
                children: [
                    new Paragraph({
                        text: e.volume?.toString() || '',
                        alignment: AlignmentType.CENTER
                    })
                ]
            }),
            new TableCell({
                children: e.authors
                    .map(a => a.author)
                    .filter(a => !a.match(new RegExp(`^${author}$`, 'i')))
                    .map(a => new Paragraph(a))
            })
        ]
    })
)
