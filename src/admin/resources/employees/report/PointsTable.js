import {Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@material-ui/core"
import React from "react"
import useStyles from "../Styles"

const PointsTable = () => {
    const classes = useStyles()

    return (
        <TableContainer style={{marginTop: 45}}>
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.widthOneThird}>
                            Минимальное кол-во баллов
                            <Typography className={classes.textSecondary}>
                                Удовлетворительно
                            </Typography>
                        </TableCell>
                        <TableCell className={classes.widthOneThird}>
                            Среднее кол-во баллов
                            <Typography className={classes.textSecondary}>
                                Хорошо
                            </Typography>
                        </TableCell>
                        <TableCell className={classes.widthOneThird}>
                            Высокое кол-во баллов
                            <Typography className={classes.textSecondary}>
                                Отлично
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>4-10</TableCell>
                        <TableCell>10-20</TableCell>
                        <TableCell>более 20</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PointsTable
