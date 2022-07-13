import { Box } from '@mui/material'
import Color from 'color'
import type { ReactNode } from 'react'
import { AppBar, Menu, ScrollTopButton, Sidebar } from '~/layout'

const Layout = ({ children }: { children?: ReactNode }) => (
	<>
		<AppBar />
		<Box
			display="flex"
			sx={{
				'*::selection': {
					bgcolor: (t) => Color(t.palette.primary.main).alpha(0.6).string(),
				},
			}}
		>
			<Sidebar>
				<Menu />
			</Sidebar>
			<Box component="main" flexGrow={1} p={3}>
				{children}
				<ScrollTopButton />
			</Box>
		</Box>
	</>
)

export default Layout
