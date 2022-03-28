import { CardContent, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { useRecordContext } from 'react-admin'
import HoursTableFull from '../../platoons/components/HoursTableFull'
import TasksTableFull from '../../platoons/components/TasksTableFull'
import styles from '../Styles'
import { HoursChart } from './HoursChart'
import HoursTable from './HoursTable'
import ProgressBar from './ProgressBar'
import { TasksChart } from './TasksChart'
import TasksTable from './TasksTable'

const dateToString = (date) => {
	if (!date) return ''
	const [, month, day] = date.split('-')
	return `${day}.${month}`
}

const Report = ({ data, info }) => {
	const { numOfPeople = 1 } = useRecordContext()
	const { whose } = info
	
	return (
		<CardContent>
			<Box textAlign='center' mt='15px' mb='30px'>
				<Typography variant='h6' style={{ fontWeight: 'bold' }}>
					Отчет {whose} за неделю
				</Typography>
				<Typography sx={styles.textSecondary}>
					{dateToString(data.startDate)} - {dateToString(data.dueDate)}
				</Typography>
				
				{data.startDate && (
					<Box
						display='flex'
						flexWrap='wrap'
						justifyContent='space-evenly'
						mt='45px'
					>
						{data.issueNumber > 0 && (
							<TasksChart {...{ data }}/>
						)}
						<HoursChart {...{ data, numOfPeople }}/>
					</Box>
				)}
				
				<Typography className={classes.subtitle}>
					<b>Выполнение задач</b>
				</Typography>
				<TasksTable {...{ data }}/>
				<ProgressBar
					value={data.issuesCompleted}
					max={data.issueNumber}
				/>
				{data.people?.length > 0 && (
					<TasksTableFull people={data.people}/>
				)}
				
				<br/>
				<Typography className={classes.subtitle}>
					<b>Трудозатраты</b>
				</Typography>
				<HoursTable {...{ data, numOfPeople }}/>
				<ProgressBar
					value={30 * numOfPeople - data.nonScienceHours}
					max={30 * numOfPeople}
				/>
				{data.people?.length > 0 && (
					<HoursTableFull people={data.people}/>
				)}
			</Box>
		</CardContent>
	)
}

export default Report
