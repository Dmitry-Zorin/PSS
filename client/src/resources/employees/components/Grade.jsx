import { CardContent, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { useRecordContext } from 'react-admin'
import styles from '../Styles'
import CircleNumber from './CircleNumber'
import { GradeChart } from './GradeChart'
import PointsTable from './PointsTable'

const Grade = ({ data, info }) => {
	const { numOfPeople = 1 } = useRecordContext()
	const { whose } = info

	return (
		<CardContent>
			<Box textAlign="center" mt="15px" mb="30px">
				<Typography variant="h6" style={{ fontWeight: 'bold' }}>
					Оценка {whose}
				</Typography>
				<Box display="flex" width="100%" mt="60px">
					<CircleNumber
						num={data.totalScore}
						max={20 * numOfPeople}
						text="Общее количество баллов"
					/>
					<CircleNumber
						num={data.avgScore}
						max={20 * numOfPeople}
						text="Среднеe количество баллов понедельно"
					/>
					<CircleNumber
						num={data.score}
						max={20 * numOfPeople}
						text="Количество баллов за прошедшую неделю"
					/>
				</Box>
				<Typography sx={styles.subtitle}>
					Шкала соответствия баллов за неделю
				</Typography>
				<PointsTable />
				<GradeChart {...{ data }} />
			</Box>
		</CardContent>
	)
}

export default Grade
