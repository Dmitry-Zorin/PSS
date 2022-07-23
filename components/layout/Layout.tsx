import {
	Grid,
	GridItem,
	Show,
	Theme,
	useBreakpointValue,
	useDisclosure,
	useMediaQuery,
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
const SIDEBAR_WIDTH = '17rem'
export const SIDEBAR_COLLAPSED_WIDTH = '4.5rem'

interface LayoutProps {
	children: ReactNode
	leftActions?: ReactNode
	rightActions?: ReactNode
	title?: string
	fullSize?: boolean
}

function LayoutGrid({
	children,
	leftActions,
	rightActions,
	title,
	fullSize = false,
}: LayoutProps) {
	const theme = useTheme<Theme>()
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()
	const {
		isOpen: isSidebarDrawerOpen,
		onOpen: onSidebarDrawerOpen,
		onClose: onSidebarDrawerClose,
	} = useDisclosure()
	const [isSmallerThanMd] = useMediaQuery(
		`(max-width: ${theme.breakpoints.md})`,
	)

	const menu = <Menu items={resources} />

	return (
		<>
			<Grid
				as={motion.div}
				templateAreas='"header header" "nav main"'
				gridTemplateRows={`${APP_BAR_HEIGHT} 1fr`}
				// sx={{
				// 	[`@media(max-width: ${theme.breakpoints.md})`]: {
				// 		gridTemplateColumns: `0 1fr !important`,
				// 	},
				// }}
				initial={false}
				animate={{
					gridTemplateColumns: `${
						isSmallerThanMd
							? '0px'
							: isSidebarOpen
							? SIDEBAR_WIDTH
							: SIDEBAR_COLLAPSED_WIDTH
					} 1fr`,
					transition: gentleSpringConfig,
				}}
			>
				<GridItem
					as={AppBar}
					area="header"
					pos="sticky"
					top={0}
					onClick={useBreakpointValue<() => void>({
						base: onSidebarDrawerOpen,
						md: () => setSidebarOpen(!isSidebarOpen),
					})}
				/>
				<Show above="md">
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
				</Show>
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
						<MainArea title={title}>{children}</MainArea>
					)}
				</GridItem>
			</Grid>
			<Show below="md">
				<SidebarDrawer
					isOpen={isSidebarDrawerOpen}
					onClose={onSidebarDrawerClose}
				>
					{menu}
				</SidebarDrawer>
			</Show>
		</>
	)
}

export default function Layout(props: LayoutProps) {
	return (
		<SidebarContextProvider>
			<LayoutGrid {...props} />
		</SidebarContextProvider>
	)
}
