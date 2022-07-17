import { HamburgerIcon } from '@chakra-ui/icons'
import { Flex, forwardRef, HStack, IconButton } from '@chakra-ui/react'
import { ColorModeSwitch, Logo } from 'components'
import { useSidebarState } from 'contexts'
import UserMenu from './UserMenu'

const AppBar = forwardRef<{}, 'div'>(({}, ref) => {
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()

	return (
		<Flex
			ref={ref}
			as="header"
			pos="sticky"
			top={0}
			bg="chakra-body-bg"
			color="text-secondary"
			// borderBottom="1px"
			// borderColor="inherit"
			align="center"
			justify="space-between"
			px={4}
			py={3}
		>
			<HStack>
				<IconButton
					aria-label="Toggle Sidebar"
					variant="unstyled"
					icon={<HamburgerIcon boxSize={6} />}
					onClick={() => setSidebarOpen(!isSidebarOpen)}
				/>
				<Logo />
			</HStack>
			<HStack>
				<ColorModeSwitch />
				<UserMenu />
			</HStack>
		</Flex>
	)
})

export default AppBar
