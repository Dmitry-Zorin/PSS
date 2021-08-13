import { Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useTranslate } from 'react-admin'

const useStyles = makeStyles({
	card: {
		height: '100%',
	},
	header: {
		textAlign: 'center',
		marginTop: '1em',
		fontSize: '2em',
	},
})

const Dashboard = () => {
	const classes = useStyles()
	const translate = useTranslate()
	
	return (
		<Card className={classes.card}>
			<Typography className={classes.header}>
				{translate('metadata.title')}
			</Typography>
		</Card>
	)
}

export default Dashboard
