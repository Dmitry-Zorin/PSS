import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import { AppBar, Head, MainArea, Menu, MenuDrawer, Sidebar } from 'components'
import resources from 'constants/resources'
import { MainAreaProps } from './MainArea'

interface LayoutProps extends MainAreaProps {
	headTitle?: string
}

export default function Layout({ headTitle, ...props }: LayoutProps) {
	const { isOpen, onOpen, onClose } = useDisclosure()

	headTitle = headTitle || props.title

	const menu = <Menu items={resources} />

	return (
		<>
			{headTitle && <Head title={headTitle} />}
			<Flex>
				<Sidebar>{menu}</Sidebar>
				<Box as="main" flexGrow={1} minW={0} minH="100vh" bg="bg">
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
