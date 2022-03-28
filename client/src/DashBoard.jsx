import { Card, Typography } from '@mui/material'
import React from 'react'
import { useTranslate } from 'react-admin'

const Dashboard = () => {
	const translate = useTranslate()

	return (
		<Card sx={{ height: '100%' }}>
			<Typography
				sx={{
					textAlign: 'center',
					marginTop: '1em',
					fontSize: '2em',
				}}
			>
				{translate('metadata.title')}
			</Typography>
		</Card>
	)
}

export default Dashboard
