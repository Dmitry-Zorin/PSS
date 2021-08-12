import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from '@material-ui/core'
import React from 'react'
import { useRecordContext } from 'react-admin'
import useStyles from '../Styles'

const PointsTable = () => {
	const classes = useStyles()
	const { numOfPeople = 1 } = useRecordContext()
	
	return (
		<TableContainer style={{ marginTop: 45 }}>
			<Table className={classes.table}>
				<TableBody>
					<TableRow>
						<TableCell className={classes.widthOneThird}>
							Минимальное количество баллов
							<Typography className={classes.textSecondary}>
								Удовлетворительно
							</Typography>
						</TableCell>
						<TableCell className={classes.widthOneThird}>
							Среднее количество баллов
							<Typography className={classes.textSecondary}>
								Хорошо
							</Typography>
						</TableCell>
						<TableCell className={classes.widthOneThird}>
							Высокое количество баллов
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
