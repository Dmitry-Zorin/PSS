import { Home } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { AppBar as RaAppBar } from 'react-admin'
import { Link } from 'react-router-dom'
import { LocaleSwitcher, ThemeSwitcher } from './components'

export const AppBar = (props) => (
	<RaAppBar color="primary" enableColorOnDark={true} container={Box} {...props}>
		<Box sx={{ flexGrow: 1 }}>
			<Typography
				component={Link}
				to="/"
				color="primary"
				sx={{
					fontStyle: 'italic',
					fontSize: '1.5rem',
					fontWeight: 700,
					textDecoration: 'none',
					p: 1,
					pl: 0,
				}}
			>
				PSS
			</Typography>
		</Box>
		<LocaleSwitcher />
		<ThemeSwitcher />
		<IconButton component={Link} to="/">
			<Home />
		</IconButton>
	</RaAppBar>
)
