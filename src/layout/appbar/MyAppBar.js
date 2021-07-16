import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import React from 'react'
import { AppBar } from 'react-admin'
import { Link } from 'react-router-dom'
import LocaleSwitcher from './LocaleSwitcher'
import ThemeSwitcher from './ThemeSwitcher'

const useStyles = makeStyles(theme => ({
	appBar: {
		'& > * > *': {
			color: 'inherit',
			borderRadius: 50,
			padding: 12,
		},
	},
	title: {
		flex: 1,
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
	},
}))

const MyAppBar = (props) => {
	const classes = useStyles()
	
	return (
		<AppBar color='primary' className={classes.appBar} {...props}>
			<Typography
				id='react-admin-title'
				variant='h6'
				color='inherit'
				className={classes.title}
			/>
			<LocaleSwitcher/>
			<ThemeSwitcher/>
			<IconButton component={Link} to='/'>
				<HomeIcon/>
			</IconButton>
		</AppBar>
	)
}

export default MyAppBar
