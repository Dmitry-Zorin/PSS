import {Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core"
import React from "react"
import useStyles from "../Styles"

const HoursTableFull = ({people}) => {
    const classes = useStyles()

    return (
        <TableContainer style={{marginTop: 45}}>
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.widthOneQuarter}>
                            Оператор
                        </TableCell>
                        <TableCell className={classes.widthOneQuarter}>
                            Повседневная деятельность
                        </TableCell>
                        <TableCell className={classes.widthOneQuarter}>
                            Научная деятельность
                        </TableCell>
                        <TableCell className={classes.widthOneQuarter}>
                            Всего рабочего времени
                        </TableCell>
                    </TableRow>
                    {people.map(p => {
                        const t = Math.random() > 0.35
                        return (
                            <TableRow key={p}>
                                <TableCell>{p}</TableCell>
                                <TableCell>{5 * t} ч.</TableCell>
                                <TableCell>{30 - 5 * t} ч.</TableCell>
                                <TableCell>30 ч.</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default HoursTableFull
