import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import {
	AppBar,
	HeadTitle,
	MainArea,
	Menu,
	MenuDrawer,
	Sidebar,
} from 'components'
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
			{headTitle && <HeadTitle title={headTitle} />}
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
