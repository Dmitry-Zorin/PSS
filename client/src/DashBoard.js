import { Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

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
	return (
		<Card className={classes.card}>
			<Typography className={classes.header}>
				Системa хранения научных трудов
			</Typography>
		</Card>
	)
}

export default Dashboard
