import { AppBar, Box, Toolbar } from '@mui/material'
import { LocaleMenu, Logo, ThemeSwitcher } from 'layout'
import { SidebarToggleButton, UserMenu } from 'react-admin'

export const SidebarHeader = () => (
	<AppBar position="sticky">
		<Toolbar
			variant="dense"
			disableGutters
			sx={{
				pl: 2,
				pr: 1,
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
			<ThemeSwitcher />
			<LocaleMenu />
			<UserMenu />
		</Toolbar>
	</AppBar>
)
