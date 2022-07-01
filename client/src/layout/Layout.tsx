import { alpha, Box } from '@mui/material'
import { Scrollable } from 'components'
import { AppBar, Menu, ScrollableWithButton, SideAppBar, Sidebar } from 'layout'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => (
	<Box
		display="flex"
		width="100vw"
		height="100vh"
		overflow="hidden"
		sx={{
			'::selection': {
				bgcolor: (t) => alpha(t.palette.primary.main, 0.5),
			},
		}}
	>
		<Sidebar>
			<SideAppBar />
			<Menu />
		</Sidebar>
		<Scrollable component="main" position="relative" flexGrow={1}>
			<AppBar />
			{children}
			<ScrollableWithButton />
		</Scrollable>
	</Box>
)

export default Layout
