import { alpha, Box, Toolbar } from '@mui/material'
import { Dial, Menu, ScrollTopButton, Sidebar } from 'layout'
import { ReactNode } from 'react'
import { animated } from 'react-spring'

export const AnimatedBox = animated(Box)

const Layout = ({ children }: { children: ReactNode }) => (
	<>
		<Dial />
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
				<Toolbar />
				{children}
			</Box>
		</Box>
		<ScrollTopButton />
	</>
)

export default Layout
