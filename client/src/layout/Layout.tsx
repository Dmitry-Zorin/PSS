import { Box, CssBaseline } from '@mui/material'
import Color from 'color'
import { Menu, ScrollTopButton, Sidebar } from 'layout'
import { ReactNode } from 'react'

const Layout = ({ children }: { children?: ReactNode }) => (
	<>
		<CssBaseline enableColorScheme />
		<Box
			display="flex"
			sx={{
				color: 'text.primary',
				'*::selection': {
					bgcolor: (t) => Color(t.palette.primary.main).alpha(0.75).string(),
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
	</>
)

export default Layout
