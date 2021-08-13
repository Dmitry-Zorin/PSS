import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import React from 'react'
import { useRecordContext } from 'react-admin'
import useStyles from '../Styles'

const HoursTable = ({ data }) => {
	const classes = useStyles()
	const { numOfPeople = 1 } = useRecordContext()
	
	return (
		<TableContainer style={{ marginTop: 45 }}>
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
						<TableCell>{data.nonScienceHours} ч.</TableCell>
						<TableCell>{30 * numOfPeople - data.nonScienceHours} ч.</TableCell>
						<TableCell>{30 * numOfPeople} ч.</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default HoursTable
