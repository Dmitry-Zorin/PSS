import {Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core"
import React from "react"
import useStyles from "../Styles"

const TasksTableFull = ({people}) => {
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
                            Невыполненых задач
                        </TableCell>
                        <TableCell className={classes.widthOneQuarter}>
                            Выполненых задач
                        </TableCell>
                        <TableCell className={classes.widthOneQuarter}>
                            Всего задач
                        </TableCell>
                    </TableRow>
                    {people.map(p => {
                        const tot = 9 + Math.round(2 * Math.random())
                        const t = +(Math.random() > 0.1)
                        return (
                            <TableRow key={p}>
                                <TableCell>{p}</TableCell>
                                <TableCell>{t}</TableCell>
                                <TableCell>{tot - t}</TableCell>
                                <TableCell>{tot}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TasksTableFull
