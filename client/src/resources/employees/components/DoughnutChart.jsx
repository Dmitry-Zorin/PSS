import Box from '@material-ui/core/Box'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

export const DoughnutChart = ({ data, text }) => (
	<Box display='flex' justifyContent='center'>
		<Box width={400}>
			<Doughnut
				data={{
					labels: data.map(e => e.label),
					datasets: [
						{
							data: data.map(e => e.value),
							backgroundColor: data.map(e => e.color),
							borderWidth: 0,
						},
					],
				}}
				plugins={[addTextInside(text)]}
			/>
		</Box>
	</Box>
)

const addTextInside = (text) => ({
	beforeDraw: (chart) => {
		const ctx = chart.ctx
		const { top, left, width, height } = chart.chartArea
		const x = left + width / 2
		const y = top + height / 2
		
		const [num, label] = text.split(' ')
		
		ctx.font = '60px OpenSans'
		ctx.fillStyle = '#000'
		ctx.fillText(num, x - 17 * num.length, y - 25)
		
		ctx.font = '30px OpenSans'
		ctx.fillStyle = '#000'
		ctx.fillText(label, x - 8.5 * label.length, y + 25)
		
		ctx.font = '24px OpenSans'
		ctx.fillStyle = '#737373'
		ctx.fillText('всего', x - 32, y + 55)
	},
})
