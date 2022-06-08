import { Home } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { AppBar as RaAppBar } from 'react-admin'
import { Link } from 'react-router-dom'
import { LocaleSwitcher, ThemeSwitcher } from './components'

export const AppBar = (props) => (
	<RaAppBar color="primary" enableColorOnDark={true} container={Box} {...props}>
		<Typography
			id="react-admin-title"
			variant="h6"
			color="inherit"
			sx={{
				flex: 1,
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				overflow: 'hidden',
			}}
		/>
		<LocaleSwitcher />
		<ThemeSwitcher />
		<IconButton component={Link} to="/">
			<Home />
		</IconButton>
	</RaAppBar>
)
