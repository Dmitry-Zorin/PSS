import {Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core"
import React from "react"
import useStyles from "../Styles"

const TasksTable = () => {
    const classes = useStyles()

    return (
        <TableContainer style={{marginTop: 30}}>
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.widthOneThird}>
                            Невыполненых задач
                        </TableCell>
                        <TableCell className={classes.widthOneThird}>
                            Выполненых задач
                        </TableCell>
                        <TableCell className={classes.widthOneThird}>
                            Всего задач
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>7</TableCell>
                        <TableCell>8</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TasksTable
