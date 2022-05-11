import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import React from 'react'
import styles from '../../employees/Styles'

const HoursTableFull = ({ people }) => (
	<TableContainer style={{ marginTop: 45 }}>
		<Table sx={styles.table}>
			<TableBody>
				<TableRow>
					<TableCell sx={styles.widthOneQuarter}>
						Оператор
					</TableCell>
					<TableCell sx={styles.widthOneQuarter}>
						Повседневная деятельность
					</TableCell>
					<TableCell sx={styles.widthOneQuarter}>
						Научная деятельность
					</TableCell>
					<TableCell sx={styles.widthOneQuarter}>
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

export default HoursTableFull
