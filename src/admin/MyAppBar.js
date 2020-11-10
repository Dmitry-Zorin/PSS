import red from '@material-ui/core/colors/red'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import React from 'react'
import { AppBar } from 'react-admin'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
	title: {
		flex: 1,
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
	},
	homeIcon: {
		color: 'white'
	}
})

const MyAppBar = (props) => {
	const classes = useStyles()
	return (
		<AppBar color='secondary' {...props}>
			<Typography
				variant="h6"
				color="inherit"
				className={classes.title}
				id="react-admin-title"
			/>
			<Link to="/">
				<IconButton className={classes.homeIcon}>
					<HomeIcon />
				</IconButton>
			</Link>
		</AppBar>
	)
}

export default MyAppBar