import {AlignmentType, Paragraph, TableCell, TableRow} from "docx"
import {getTableRow} from "./tableRow"

export const getTableRows = (data, author, index, text) => {
    const getRows = (key) => {
        const rows = data[key].map(e => getTableRow(author, e, index))

        if (rows.length) {
            if (key === 'new') {
                text = text.slice(3) + ', опубликованные за последние три года'
            }
            rows.unshift(
                new TableRow({
                    children: [
                        new TableCell({
                            columnSpan: 6,
                            children: [
                                new Paragraph({
                                    text,
                                    alignment: AlignmentType.CENTER
                                })
                            ]
                        })
                    ]
                })
            )
        }

        return rows
    }

    return [
        ...getRows('old'),
        ...getRows('new')
    ]
}
