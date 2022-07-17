import { Grid, GridItem } from '@chakra-ui/react'
import {
	ActionsToolbar,
	AppBar,
	MainArea,
	Menu,
	Sidebar,
	SidebarContextProvider,
	useSidebarState,
} from 'components'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import resources from 'resources/resources'
import { gentleSpringConfig } from 'utils'

const APP_BAR_HEIGHT = '4rem'
const SIDEBAR_WIDTH = '18rem'
export const SIDEBAR_COLLAPSED_WIDTH = '4rem'

interface LayoutProps {
	children: ReactNode
	actions?: ReactNode
	title?: string
	fullSize?: boolean
	rightMenu?: ReactNode
}

function LayoutGrid({
	children,
	actions,
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
				borderRight={isSidebarOpen ? 0 : '1px'}
				borderColor="inherit"
				overflowX="hidden"
				overflowY="auto"
				flexShrink={0}
			>
				<Menu items={resources} />
			</GridItem>
			<GridItem as="main" area="main">
				{actions && <ActionsToolbar>{actions}</ActionsToolbar>}
				{fullSize ? (
					<>{children}</>
				) : (
					<MainArea title={title} rightMenu={rightMenu}>
						{children}
					</MainArea>
				)}
				{/* <ScrollTopButton /> */}
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
