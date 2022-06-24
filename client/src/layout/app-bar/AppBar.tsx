import { Home, InfoOutlined } from '@mui/icons-material'
import { AppBar as MuiAppBar, Box, IconButton, Toolbar } from '@mui/material'
import { LoadingIndicator, UserMenu } from 'react-admin'
import { Link } from 'react-router-dom'
import { LocaleMenu, ThemeSwitcher } from '.'

const AppBar = () => (
	<MuiAppBar
		color="inherit"
		position="static"
		sx={{
			borderBottom: 1,
			borderColor: 'divider',
		}}
	>
		<Toolbar>
			<Box flexGrow={1}></Box>
			<ThemeSwitcher />
			<LocaleMenu />
			<IconButton color="inherit" component={Link} to="/">
				<Home />
			</IconButton>
			<IconButton color="inherit" component={Link} to="/about">
				<InfoOutlined />
			</IconButton>
			<LoadingIndicator />
			<UserMenu />
		</Toolbar>
	</MuiAppBar>
)

export default AppBar
