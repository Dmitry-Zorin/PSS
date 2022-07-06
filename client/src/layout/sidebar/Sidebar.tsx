import { Box, Divider, Theme, Toolbar, useMediaQuery } from '@mui/material'
import { AnimatedBox, Drawer, gentleConfig, Slide } from 'components'
import { ReactNode } from 'react'
import { UserMenu, useSidebarState } from 'react-admin'
import { config, useSpring } from 'react-spring'
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
			height="100vh"
			bgcolor="background.sidebar"
			borderRight={1}
			borderColor="border"
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
			<Toolbar>
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
			flexShrink={0}
			position="sticky"
			top={0}
			height="100vh"
			style={style}
		>
			<Slide in={true} from="left" config={config.slow}>
				<AnimatedBox>{content}</AnimatedBox>
			</Slide>
		</AnimatedBox>
	)
}

export default Sidebar
