import { alpha, Box } from '@mui/material'
import { Menu, ScrollTopButton, Sidebar } from 'layout'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => (
	<Box
		display="flex"
		sx={{
			color: 'text.primary',
			'::selection': {
				bgcolor: (t) => alpha(t.palette.primary.main, 0.5),
			},
		}}
	>
		<Sidebar>
			<Menu />
		</Sidebar>
		<Box component="main" flexGrow={1} pl={2} pr={3}>
			{children}
			<ScrollTopButton />
		</Box>
	</Box>
)

export default Layout
