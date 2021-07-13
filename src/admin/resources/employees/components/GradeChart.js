import { useTheme } from '@material-ui/core'
import React from 'react'
import { Line } from 'react-chartjs-2'

export const GradeChart = ({ data }) => {
	const theme = useTheme()
	const labels = data.scores.map(e => `${dateToString(e.startDate)}-${dateToString(
		e.dueDate)}`)
	
	return (
		<Line
			style={{ marginTop: 60 }}
			data={{
				labels,
				datasets: [{
					data: data.scores.map(e => e.score),
					label: 'Количество баллов',
					fill: false,
					borderColor: theme.palette.secondary.main,
					tension: 0,
				}],
			}}
		/>
	)
}

const dateToString = (date) => {
	if (!date) return ''
	const [, month, day] = date.split('-')
	return `${day}.${month}`
}
