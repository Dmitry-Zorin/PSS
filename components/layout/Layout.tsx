import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import { AppBar, MainArea, Menu, MenuDrawer, Sidebar } from 'components'
import resources from 'constants/resources'
import { MainAreaProps } from './MainArea'

export default function Layout(props: MainAreaProps) {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const menu = <Menu items={resources} />

	return (
		<>
			<Flex>
				<Sidebar
					pos={{
						base: 'sticky',
						'2xl': props.fullSize ? 'sticky' : 'fixed',
					}}
				>
					{menu}
				</Sidebar>
				<Box as="main" flexGrow={1} bg="bg" minH="100vh">
					<AppBar onMenuDrawerOpen={onOpen} />
					<MainArea {...props} />
				</Box>
			</Flex>
			<MenuDrawer isOpen={isOpen} onClose={onClose}>
				{menu}
			</MenuDrawer>
		</>
	)
}
