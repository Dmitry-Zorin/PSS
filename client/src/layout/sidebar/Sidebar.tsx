import { Box, Divider, Theme, Toolbar, useMediaQuery } from '@mui/material'
import { AnimatedBox, Drawer, gentleConfig } from 'components'
import { ReactNode } from 'react'
import { UserMenu, useSidebarState } from 'react-admin'
import { useSpring } from 'react-spring'
import { SidebarHeader } from './SidebarHeader'

const Sidebar = ({ children }: { children: ReactNode }) => {
	const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()
	const style = useSpring({
		width: isSidebarOpen ? 315 : 56,
		config: gentleConfig,
	})

	const content = (
		<Box
			height={1}
			width="auto"
			bgcolor="background.sidebar"
			borderRadius="0 16px 0 0"
			sx={{
				overflowX: 'hidden',
				overflowY: 'auto',
				'::-webkit-scrollbar': {
					display: 'none',
				},
			}}
		>
			<SidebarHeader />
			{children}
			<Divider sx={{ m: 2, mb: 0 }} />
			<Toolbar sx={{ borderRadius: 2 }}>
				<Box>
					<UserMenu />
				</Box>
			</Toolbar>
		</Box>
	)

	return isSmall ? (
		<Drawer
			open={isSidebarOpen}
			onClose={() => setSidebarOpen(false)}
			sx={{ bgcolor: 'background.sidebar' }}
		>
			{content}
		</Drawer>
	) : (
		<AnimatedBox
			component="nav"
			position="sticky"
			top={0}
			height="calc(100vh - 12px)"
			flexShrink={0}
			pt={1.5}
			style={style}
		>
			{content}
		</AnimatedBox>
	)
}

export default Sidebar
