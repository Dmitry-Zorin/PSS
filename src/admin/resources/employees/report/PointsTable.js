import {Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@material-ui/core"
import React from "react"
import useStyles from "../Styles"

const PointsTable = ({numOfPeople=1}) => {
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
                        <TableCell>{4 * numOfPeople}-{10 * numOfPeople}</TableCell>
                        <TableCell>{10 * numOfPeople}-{20 * numOfPeople}</TableCell>
                        <TableCell>более {20 * numOfPeople}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PointsTable
