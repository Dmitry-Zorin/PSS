import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from '@material-ui/core'
import React from 'react'
import useStyles from '../Styles'

const TasksTable = ({ data }) => {
	const classes = useStyles()
	
	return (
		<TableContainer style={{ marginTop: 45 }}>
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
						<TableCell>{data.issueNumber - data.issuesCompleted}</TableCell>
						<TableCell>{data.issuesCompleted}</TableCell>
						<TableCell>{data.issueNumber}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default TasksTable
