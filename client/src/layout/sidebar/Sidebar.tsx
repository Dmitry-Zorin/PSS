import { Box, Divider, Paper, Theme, useMediaQuery } from '@mui/material'
import { AnimatedBox, Drawer, gentleConfig, Slide } from 'components'
import { SidebarFooter, SidebarHeader } from 'layout'
import { ReactNode } from 'react'
import { useSidebarState } from 'react-admin'
import { config, Spring } from 'react-spring'

const SIDEBAR_WIDTH = 300
const SIDEBAR_CLOSED_WIDTH = 56

const Sidebar = ({ children }: { children: ReactNode }) => {
	const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()

	const content = (
		<Paper>
			<Box
				height="100vh"
				// bgcolor="background.sidebar"
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
				<SidebarFooter />
			</Box>
		</Paper>
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
					<Slide from="left" config={config.slow}>
						<AnimatedBox>{content}</AnimatedBox>
					</Slide>
				</AnimatedBox>
			)}
		</Spring>
	)
}

export default Sidebar
