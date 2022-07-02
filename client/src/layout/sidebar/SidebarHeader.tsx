import { AppBar, Toolbar } from '@mui/material'
import { Logo } from 'layout'
import { SidebarToggleButton } from 'react-admin'

export const SidebarHeader = () => (
	<AppBar color="transparent" position="sticky">
		<Toolbar sx={{ p: 0 }}>
			<SidebarToggleButton />
			<Logo />
		</Toolbar>
	</AppBar>
)
