import { Settings } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import { LocaleMenu, Logo, ThemeSwitcher } from 'layout'
import { SidebarToggleButton, UserMenu } from 'react-admin'

export const SidebarHeader = () => (
	<AppBar position="sticky" sx={{ mb: 1 }}>
		<Toolbar
			disableGutters
			sx={{
				pl: 1,
				pr: 2,
				bgcolor: 'background.header',
				color: 'text.medium',
			}}
		>
			<SidebarToggleButton />
			<Box flexGrow={1}>
				<Logo />
			</Box>
			<IconButton color="inherit">
				<Settings />
			</IconButton>
			<UserMenu />
		</Toolbar>
		<Toolbar
			variant="dense"
			sx={{
				display: 'none',
				px: 1,
				bgcolor: 'background.sidebar',
				// justifyContent: 'space-evenly',
			}}
		>
			<ThemeSwitcher />
			<LocaleMenu />
		</Toolbar>
	</AppBar>
)
