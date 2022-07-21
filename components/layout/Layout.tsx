import { Grid, GridItem } from '@chakra-ui/react'
import {
	ActionsToolbar,
	AppBar,
	MainArea,
	Menu,
	Sidebar,
	SidebarContextProvider,
} from 'components'
import { motion } from 'framer-motion'
import { useSidebarState } from 'hooks'
import { ReactNode } from 'react'
import resources from 'constants/resources'
import { gentleSpringConfig } from 'utils'

const APP_BAR_HEIGHT = '4rem'
const SIDEBAR_WIDTH = '16rem'
export const SIDEBAR_COLLAPSED_WIDTH = '4.5rem'

interface LayoutProps {
	children: ReactNode
	leftActions?: ReactNode
	rightActions?: ReactNode
	title?: string
	fullSize?: boolean
	rightMenu?: ReactNode
}

function LayoutGrid({
	children,
	leftActions,
	rightActions,
	title,
	fullSize = false,
	rightMenu,
}: LayoutProps) {
	const [isSidebarOpen] = useSidebarState()

	return (
		<Grid
			as={motion.div}
			templateAreas='"header header" "nav main"'
			gridTemplateRows={`${APP_BAR_HEIGHT} 1fr`}
			initial={false}
			animate={{
				gridTemplateColumns: `${
					isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH
				} 1fr`,
				transition: gentleSpringConfig,
			}}
		>
			<GridItem as={AppBar} area="header" pos="sticky" top={0} />
			<GridItem
				as={Sidebar}
				area="nav"
				pos="sticky"
				top={APP_BAR_HEIGHT}
				h={`calc(100vh - ${APP_BAR_HEIGHT})`}
				overflowX="hidden"
				overflowY="auto"
				flexShrink={0}
			>
				<Menu items={resources} />
			</GridItem>
			<GridItem as="main" area="main" px={4} py={2}>
				{(leftActions || rightActions) && (
					<ActionsToolbar
						leftActions={leftActions}
						rightActions={rightActions}
					/>
				)}
				{fullSize ? (
					<>{children}</>
				) : (
					<MainArea title={title} rightMenu={rightMenu}>
						{children}
					</MainArea>
				)}
			</GridItem>
		</Grid>
	)
}

export default function Layout(props: LayoutProps) {
	return (
		<SidebarContextProvider>
			<LayoutGrid {...props} />
		</SidebarContextProvider>
	)
}
