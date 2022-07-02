import { Box, Theme, useMediaQuery } from '@mui/material'
import { Drawer, Scrollable } from 'components'
import { ReactNode } from 'react'
import { SidebarToggleButton, useSidebarState } from 'react-admin'
import { animated, config, useSpring } from 'react-spring'
import { SidebarHeader } from './SidebarHeader'

const AnimatedBox = animated(Box)

const Sidebar = ({ children }: { children: ReactNode }) => {
	const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()

	const style = useSpring({
		width: isSidebarOpen ? 315 : 56,
		config: {
			...config.gentle,
			mass: 0.5,
		},
	})

	const content = (
		<>
			<SidebarHeader />
			<Scrollable
				scrollbarWidth={4}
				height="calc(100vh - 64px)"
				sx={{ overflowX: 'hidden' }}
			>
				{children}
			</Scrollable>
		</>
	)

	return isSmall ? (
		<>
			<SidebarToggleButton />
			<Drawer
				open={isSidebarOpen}
				onClose={() => setSidebarOpen(false)}
				sx={{ bgcolor: 'background.sidebar' }}
			>
				{content}
			</Drawer>
		</>
	) : (
		<AnimatedBox
			position="sticky"
			height="100vh"
			top={0}
			flexShrink={0}
			bgcolor="background.sidebar"
			style={style}
		>
			{content}
		</AnimatedBox>
	)
}

export default Sidebar
