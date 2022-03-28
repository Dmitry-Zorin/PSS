import HomeIcon from '@mui/icons-material/Home'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import React from 'react'
import { AppBar } from 'react-admin'
import { Link } from 'react-router-dom'
import LocaleSwitcher from './LocaleSwitcher'
import ThemeSwitcher from './ThemeSwitcher'

const MyAppBar = (props) => (
	<AppBar
		color='primary'
		sx={{
			'& > * > *': {
				color: 'inherit',
				borderRadius: 50,
			},
		}}
		{...props}
	>
		<Typography
			id='react-admin-title'
			variant='h6'
			color='inherit'
			sx={{
				flex: 1,
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				overflow: 'hidden',
			}}
		/>
		<LocaleSwitcher/>
		<ThemeSwitcher/>
		<IconButton component={Link} to='/'>
			<HomeIcon/>
		</IconButton>
	</AppBar>
)

export default MyAppBar
