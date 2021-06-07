import {Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core"
import React from "react"
import useStyles from "../Styles"

const HoursTable = () => {
    const classes = useStyles()

    return (
        <TableContainer style={{marginTop: 30}}>
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.widthOneThird}>
                            Повседневная деятельность
                        </TableCell>
                        <TableCell className={classes.widthOneThird}>
                            Научная деятельность
                        </TableCell>
                        <TableCell className={classes.widthOneThird}>
                            Всего рабочего времени
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>5 ч.</TableCell>
                        <TableCell>25 ч.</TableCell>
                        <TableCell>30 ч.</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default HoursTable
