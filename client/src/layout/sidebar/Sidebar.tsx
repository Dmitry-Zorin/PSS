import { Box, Divider, Theme, Toolbar, useMediaQuery } from '@mui/material'
import { AnimatedBox, Drawer, gentleConfig, Slide } from 'components'
import { ReactNode } from 'react'
import { useSidebarState } from 'react-admin'
import { config, Spring } from 'react-spring'
import { SidebarHeader } from './SidebarHeader'

const SIDEBAR_WIDTH = 300
const SIDEBAR_CLOSED_WIDTH = 56

const Sidebar = ({ children }: { children: ReactNode }) => {
	const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()

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
			<Divider sx={{ mx: 2, my: 1 }} />
			<Toolbar />
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
		<Spring
			to={{ width: isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_CLOSED_WIDTH }}
			config={gentleConfig}
		>
			{(style) => (
				<AnimatedBox
					component="nav"
					position="sticky"
					top={0}
					height="100vh"
					flexShrink={0}
					style={style}
				>
					<Slide in={true} from="left" config={config.slow}>
						<AnimatedBox>{content}</AnimatedBox>
					</Slide>
				</AnimatedBox>
			)}
		</Spring>
	)
}

export default Sidebar
