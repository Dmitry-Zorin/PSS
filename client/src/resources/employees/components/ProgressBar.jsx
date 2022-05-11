import { Paper, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import range from 'just-range'
import React from 'react'

const maxNumOfSteps = 16
const circleSize = 75

const ProgressBar = ({ value = 0, max = 0 }) => {
	if (!max) return null

	const ratio = max ? value / max : 0.5
	const numOfSteps = max ? getNumOfSteps(max) : 1
	const values = range(numOfSteps).map(e => e * max / (numOfSteps - 1))

	return (
		<Paper
			elevation={2} style={{
			position: 'relative',
			height: 50,
			background: 'linear-gradient(to right, #FF4040, #EAFF00 65%, #6AFF00)',
			borderRadius: 100,
			marginTop: 45,
			display: 'flex',
			alignItems: 'center',
		}}
		>
			<Box display='flex' justifyContent='space-between' width='100%' m='25px'>
				{values.map(value => (
					<Box key={value} width='30px'>
						<Typography style={{ fontSize: 18 }}>{value % 1
							? ''
							: value}</Typography>
					</Box>
				))}
			</Box>
			<Paper
				elevation={4} style={{
				position: 'absolute',
				left: `calc(${ratio * 100}% - ${ratio * circleSize}px)`,
				borderRadius: '100%',
				width: circleSize,
				height: circleSize,
				border: '1px solid #ddd',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
			>
				<Typography style={{ fontSize: 26 }}>{value}</Typography>
			</Paper>
		</Paper>
	)
}

const getNumOfSteps = (max) => {
	const steps = { numOfInts: 0 }
	for (let num = 2; num <= maxNumOfSteps; num++) {
		let numOfInts = 0
		for (let i = 0; i < num; i++) {
			numOfInts += (i * max / (num - 1)) % 1 === 0
		}
		if (numOfInts > steps.numOfInts) {
			steps.numOfInts = numOfInts
			steps.value = num
		}
	}
	return steps.value
}

export default ProgressBar
