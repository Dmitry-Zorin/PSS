import { Box, Drawer, Theme, useMediaQuery } from '@mui/material'
import { Scrollable } from 'components'
import { ReactNode } from 'react'
import { useSidebarState } from 'react-admin'
import { animated, config, useSpring } from 'react-spring'

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
		<Scrollable scrollbarWidth={4} height={1}>
			{children}
		</Scrollable>
	)

	return isSmall ? (
		<Drawer
			open={isSidebarOpen}
			onClose={() => setSidebarOpen(false)}
			sx={{
				'.MuiDrawer-paper': {
					overflow: 'hidden',
					bgcolor: 'background.sidebar',
				},
			}}
		>
			{content}
		</Drawer>
	) : (
		<AnimatedBox
			flexShrink={0}
			borderRight={1}
			borderColor="divider"
			style={style}
		>
			{content}
		</AnimatedBox>
	)
}

export default Sidebar
