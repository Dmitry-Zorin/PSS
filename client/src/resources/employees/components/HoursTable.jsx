import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from '@mui/material'
import React from 'react'
import { useRecordContext } from 'react-admin'
import styles from '../Styles'

const HoursTable = ({ data }) => {
	const { numOfPeople = 1 } = useRecordContext()

	return (
		<TableContainer style={{ marginTop: 45 }}>
			<Table sx={styles.table}>
				<TableBody>
					<TableRow>
						<TableCell sx={styles.widthOneThird}>
							Повседневная деятельность
						</TableCell>
						<TableCell sx={styles.widthOneThird}>
							Научная деятельность
						</TableCell>
						<TableCell sx={styles.widthOneThird}>
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
