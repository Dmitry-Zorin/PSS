import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from '@material-ui/core'
import React from 'react'
import useStyles from '../../employees/Styles'

const TasksTableFull = ({ people }) => {
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
							Невыполненых задач
						</TableCell>
						<TableCell className={classes.widthOneQuarter}>
							Выполненых задач
						</TableCell>
						<TableCell className={classes.widthOneQuarter}>
							Всего задач
						</TableCell>
					</TableRow>
					{people.map(p => (
						<TableRow key={p}>
							<TableCell>{p.name}</TableCell>
							<TableCell>{p.issueNumber - p.issuesCompleted}</TableCell>
							<TableCell>{p.issuesCompleted}</TableCell>
							<TableCell>{p.issueNumber}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default TasksTableFull
