import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import React from 'react'
import styles from '../Styles'

const TasksTable = ({ data }) => (
	<TableContainer style={{ marginTop: 45 }}>
		<Table sx={styles.table}>
			<TableBody>
				<TableRow>
					<TableCell sx={styles.widthOneThird}>
						Невыполненых задач
					</TableCell>
					<TableCell sx={styles.widthOneThird}>
						Выполненых задач
					</TableCell>
					<TableCell sx={styles.widthOneThird}>
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

export default TasksTable
