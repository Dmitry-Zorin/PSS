import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from '@mui/material'
import React from 'react'
import { useRecordContext } from 'react-admin'
import styles from '../Styles'

const PointsTable = () => {
	const { numOfPeople = 1 } = useRecordContext()

	return (
		<TableContainer style={{ marginTop: 45 }}>
			<Table sx={styles.table}>
				<TableBody>
					<TableRow>
						<TableCell sx={styles.widthOneThird}>
							Минимальное количество баллов
							<Typography sx={styles.textSecondary}>
								Удовлетворительно
							</Typography>
						</TableCell>
						<TableCell sx={styles.widthOneThird}>
							Среднее количество баллов
							<Typography sx={styles.textSecondary}>Хорошо</Typography>
						</TableCell>
						<TableCell sx={styles.widthOneThird}>
							Высокое количество баллов
							<Typography sx={styles.textSecondary}>Отлично</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							{4 * numOfPeople}-{10 * numOfPeople}
						</TableCell>
						<TableCell>
							{10 * numOfPeople}-{20 * numOfPeople}
						</TableCell>
						<TableCell>более {20 * numOfPeople}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default PointsTable
