import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import { AppBar, MainArea, Menu, Sidebar, SidebarDrawer } from 'components'
import resources from 'constants/resources'
import { SidebarContextProvider } from 'contexts/SidebarContext'
import { MainAreaProps } from './MainArea'

export default function Layout(props: MainAreaProps) {
	const { isOpen: isSidebarDrawerOpen, onClose: onSidebarDrawerClose } =
		useDisclosure()

	const menu = <Menu items={resources} />

	return (
		<>
			<Flex>
				<SidebarContextProvider>
					<Sidebar>{menu}</Sidebar>
				</SidebarContextProvider>
				<Box flexGrow={1}>
					<AppBar />
					<MainArea {...props} />
				</Box>
			</Flex>
			<SidebarDrawer
				isOpen={isSidebarDrawerOpen}
				onClose={onSidebarDrawerClose}
			>
				{menu}
			</SidebarDrawer>
		</>
	)
}
