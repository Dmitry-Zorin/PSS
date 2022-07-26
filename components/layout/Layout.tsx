import {
	Grid,
	GridItem,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react'
import { AppBar, Menu, Sidebar, SidebarDrawer } from 'components'
import resources from 'constants/resources'
import { SidebarContextProvider } from 'contexts/SidebarContext'
import { motion } from 'framer-motion'
import { useSidebarState } from 'hooks'
import { getSpringAnimation } from 'utils'
import MainContent, { MainContentProps } from './MainContent'

const APP_BAR_HEIGHT = '4rem'
const SIDEBAR_WIDTH = '17rem'
const SIDEBAR_COLLAPSED_WIDTH = '4.5rem'

function LayoutGrid(props: MainContentProps) {
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()

	const {
		isOpen: isSidebarDrawerOpen,
		onOpen: onSidebarDrawerOpen,
		onClose: onSidebarDrawerClose,
	} = useDisclosure()

	const menu = <Menu items={resources} />

	// useEffect(() => {
	// 	first
	// }, [])

	return (
		<>
			<Grid
				as={motion.div}
				templateAreas={{
					base: '"header" "main"',
					md: '"header header" "nav main"',
				}}
				templateRows={`${APP_BAR_HEIGHT} 1fr`}
				templateColumns={{
					base: '1fr',
					md: `${isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH} 1fr`,
				}}
				initial={false}
				animate={{
					// gridTemplateColumns: `${
					// 	isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH
					// } 1fr`,
					transition: getSpringAnimation(isSidebarOpen),
				}}
			>
				<GridItem
					area="header"
					as={AppBar}
					onClick={useBreakpointValue({
						base: onSidebarDrawerOpen,
						md: () => setSidebarOpen(!isSidebarOpen),
					})}
				/>
				<GridItem
					area="nav"
					as={Sidebar}
					top={APP_BAR_HEIGHT}
					h={`calc(100vh - ${APP_BAR_HEIGHT})`}
					display={{
						base: 'none',
						md: 'block',
					}}
				>
					{menu}
				</GridItem>
				<GridItem area="main" as={MainContent} {...props} />
			</Grid>
			<SidebarDrawer
				isOpen={isSidebarDrawerOpen}
				onClose={onSidebarDrawerClose}
			>
				{menu}
			</SidebarDrawer>
		</>
	)
}

export default function Layout(props: MainContentProps) {
	return (
		<SidebarContextProvider>
			<LayoutGrid {...props} />
		</SidebarContextProvider>
	)
}
