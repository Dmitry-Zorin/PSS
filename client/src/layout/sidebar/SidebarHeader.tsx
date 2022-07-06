import { AppBar, Box, Toolbar } from '@mui/material'
import { LocaleMenu, Logo, ThemeSwitcher } from 'layout'
import { SidebarToggleButton, UserMenu } from 'react-admin'

export const SidebarHeader = () => (
	<AppBar position="sticky">
		<Toolbar
			variant="dense"
			disableGutters
			sx={{
				px: 1,
				py: 0,
				bgcolor: 'background.header',
				color: 'text.medium',
				borderBottom: 1,
				borderColor: 'border',
			}}
		>
			<SidebarToggleButton />
			<Box flexGrow={1}>
				<Logo />
			</Box>
			<UserMenu />
			<LocaleMenu />
			<ThemeSwitcher />
		</Toolbar>
	</AppBar>
)
