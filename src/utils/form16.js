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
import {saveAs} from 'file-saver'

let index = 1

export const createForm16 = (data, name, author, title) => {
    const doc = new Document({
        sections: [{
            properties: {},
            margins: {
                top: 0,
                right: 500,
                bottom: 0,
                left: 500,
            },
            children: [
                new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: 'Форма N 16',
                            color: '000000'
                        })
                    ]
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    heading: HeadingLevel.HEADING_1,
                    children: [
                        new TextRun({
                            text: 'СПИСОК',
                            color: '000000'
                        })
                    ]
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: 'научных и учебно-методических работ',
                            color: '000000'
                        })
                    ]
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    heading: HeadingLevel.HEADING_2,
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
                new Paragraph({}),
                getTable(data, author, name),
                new Paragraph({}),
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: title,
                            color: '000000'
                        })
                    ]
                }),
                new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: `${name.split(' ')[1][0].toUpperCase()}. ${author[0].toUpperCase()}${author.split(' ')[0].slice(1)}`,
                            color: '000000',
                        })
                    ]
                }),
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: `«___» __________ ${new Date().getFullYear()} г`,
                            color: '000000',
                        })
                    ]
                })
            ]
        }]
    })

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, 'Список научных трудов.docx')
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
                                text: 'Наименование учебных изданий, научных трудов и патентов на изобретения и иные объекты интеллектуальной собственности',
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
                                text: 'Форма учебных изданий и научных трудов',
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
                                text: 'Объём',
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
            ...getDataTableRows(data[0], author, name, 'a) научные работы'),
            ...getDataTableRows(data[1], author, name, 'б) авторские свидетельства, дипломы, патенты, лицензии, информационные карты, алгоритмы, проекты'),
            ...getDataTableRows(data[2], author, name, 'в) учебно-методические работы')
        ]
    })
)

const getDataTableRows = (data, author, name, text) => (
    [
        data.old.length ? new TableRow({
            children: [
                new TableCell({
                    columnSpan: 6,
                    children: [
                        new Paragraph({
                            text: text,
                            alignment: AlignmentType.CENTER
                        })
                    ]
                })
            ]
        }) : undefined,
        ...data.old.map(e => getDataTableRow(author, name, e)),
        data.new.length ? new TableRow({
            children: [
                new TableCell({
                    columnSpan: 6,
                    children: [
                        new Paragraph({
                            text: text.slice(3) + ', опубликованные за последние три года',
                            alignment: AlignmentType.CENTER
                        })
                    ]
                })
            ]
        }) : undefined,
        ...data.new.map(e => getDataTableRow(author, name, e))
    ].filter(e => e)
)

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
                        e.exitData || e.publicationPlace !== '-' ?
                            `${e.publicationPlace}, ${e.creationDate}`
                            : e.creationDate.toString()
                    )
                ]
            }),
            new TableCell({
                children: [
                    new Paragraph({
                        text: (e.volume || '').toString(),
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
