import { Typography } from '@material-ui/core'
import React from 'react'
import { DoughnutChart } from './DoughnutChart.js'

const activities = new Map([
	['completed', { label: 'Выполненых', color: '#6AFF00' }],
	['uncompleted', { label: 'Неыполненых', color: '#FF4040' }],
])

export const TasksChart = ({ data }) => {
	activities.get('completed').value = data.issuesCompleted
	activities.get('uncompleted').value = data.issueNumber - data.issuesCompleted
	
	return (
		<div>
			<Typography style={{ marginBottom: 15 }}>
				<b>Выполнение задач</b>
			</Typography>
			<DoughnutChart
				data={[...activities.values()]}
				text={`${data.issueNumber} задач`}
			/>
		</div>
	)
}
