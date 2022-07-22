import {
	Grid,
	GridItem,
	Show,
	Theme,
	useBreakpointValue,
	useDisclosure,
	useTheme,
} from '@chakra-ui/react'
import {
	ActionsToolbar,
	AppBar,
	MainArea,
	Menu,
	Sidebar,
	SidebarDrawer,
} from 'components'
import resources from 'constants/resources'
import { SidebarContextProvider } from 'contexts/SidebarContext'
import { motion } from 'framer-motion'
import { useSidebarState } from 'hooks'
import { ReactNode } from 'react'
import { gentleSpringConfig } from 'utils'

const APP_BAR_HEIGHT = '4rem'
const SIDEBAR_WIDTH = '15rem'
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
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()
	const theme = useTheme<Theme>()
	const {
		isOpen: isSidebarDrawerOpen,
		onOpen: onSidebarDrawerOpen,
		onClose: onSidebarDrawerClose,
	} = useDisclosure()

	const menu = <Menu items={resources} />

	return (
		<Grid
			as={motion.div}
			templateAreas='"header header" "nav main"'
			gridTemplateRows={`${APP_BAR_HEIGHT} 1fr`}
			sx={{
				[`@media(max-width: ${theme.breakpoints.md})`]: {
					gridTemplateColumns: `0 1fr !important`,
				},
			}}
			initial={false}
			animate={{
				gridTemplateColumns: `${
					isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH
				} 1fr`,
				transition: gentleSpringConfig,
			}}
		>
			<GridItem
				as={AppBar}
				area="header"
				pos="sticky"
				top={0}
				isSidebarOpen={
					!!useBreakpointValue<boolean>({
						base: isSidebarDrawerOpen,
						md: isSidebarOpen,
					})
				}
				onClick={useBreakpointValue<() => void>({
					base: onSidebarDrawerOpen,
					md: () => setSidebarOpen(!isSidebarOpen),
				})}
			/>
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
				{menu}
			</GridItem>
			<GridItem as="main" area="main" px={6} py={4}>
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
			<Show below="md">
				<SidebarDrawer
					isOpen={isSidebarDrawerOpen}
					onClose={onSidebarDrawerClose}
				>
					{menu}
				</SidebarDrawer>
			</Show>
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
