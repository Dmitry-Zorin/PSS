import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import React from 'react'
import styles from '../../employees/Styles'

const TasksTableFull = ({ people }) => (
		<TableContainer style={{ marginTop: 45 }}>
			<Table sx={styles.table}>
				<TableBody>
					<TableRow>
						<TableCell sx={styles.widthOneQuarter}>
							Оператор
						</TableCell>
						<TableCell sx={styles.widthOneQuarter}>
							Невыполненых задач
						</TableCell>
						<TableCell sx={styles.widthOneQuarter}>
							Выполненых задач
						</TableCell>
						<TableCell sx={styles.widthOneQuarter}>
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

export default TasksTableFull
