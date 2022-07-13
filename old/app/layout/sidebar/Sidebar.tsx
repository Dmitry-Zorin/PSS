import type { Theme } from '@mui/material'
import { Box, useMediaQuery } from '@mui/material'
import { config, Spring } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useSidebarState } from 'react-admin'
import { AnimatedBox, Drawer, gentleConfig, Slide } from '~/components'
import { SidebarFooter } from '~/layout'

const SIDEBAR_WIDTH = 290
const SIDEBAR_CLOSED_WIDTH = 68

const Sidebar = ({ children }: { children: ReactNode }) => {
	const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()

	const content = (
		<Box
			height="100vh"
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
			{children}
			<SidebarFooter />
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
					<Slide from="left" config={config.slow}>
						<AnimatedBox>{content}</AnimatedBox>
					</Slide>
				</AnimatedBox>
			)}
		</Spring>
	)
}

export default Sidebar
