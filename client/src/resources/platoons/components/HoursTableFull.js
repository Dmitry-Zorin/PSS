import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import React from 'react'
import useStyles from '../../employees/Styles'

const HoursTableFull = ({ people }) => {
	const classes = useStyles()
	
	return (
		<TableContainer style={{ marginTop: 45 }}>
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
					{people.map(p => (
						<TableRow key={p}>
							<TableCell>{p.name}</TableCell>
							<TableCell>{p.nonScienceHours} ч.</TableCell>
							<TableCell>{30 - p.nonScienceHours} ч.</TableCell>
							<TableCell>30 ч.</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default HoursTableFull
