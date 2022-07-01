import { Home, Info } from '@mui/icons-material'
import { Box, IconButton, Toolbar } from '@mui/material'
import { LocaleMenu, Logo, ThemeSwitcher } from 'layout'
import { LoadingIndicator, UserMenu, useSidebarState } from 'react-admin'
import { Link } from 'react-router-dom'

const AppBar = () => {
	// const [isSidebarOpen] = useSidebarState()
	return (
		<Toolbar
			sx={{
				// bgcolor: 'background.default',
				borderBottom: 1,
				borderColor: 'divider',
			}}
		>
			{/* {!isSidebarOpen && <Logo />} */}
			<Box flexGrow={1}></Box>
			<ThemeSwitcher />
			<LocaleMenu />
			<IconButton color="inherit" component={Link} to="/">
				<Home />
			</IconButton>
			<IconButton color="inherit" component={Link} to="/about">
				<Info />
			</IconButton>
			<LoadingIndicator />
			<UserMenu />
		</Toolbar>
	)
}

export default AppBar
