import { AppBar, Toolbar } from '@mui/material'
import { Logo } from 'layout'
import { SidebarToggleButton } from 'react-admin'

export const SideAppBar = () => (
	<AppBar color="inherit" position="sticky">
		<Toolbar>
			<SidebarToggleButton />
			<Logo />
		</Toolbar>
	</AppBar>
)
