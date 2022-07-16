import { HamburgerIcon } from '@chakra-ui/icons'
import { Flex, forwardRef, IconButton, Tooltip } from '@chakra-ui/react'
import { ColorModeSwitch, Logo } from 'components'
import { useSidebarState } from 'contexts'
import UserMenu from './UserMenu'

const AppBar = forwardRef<{}, 'div'>(({}, ref) => {
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()

	return (
		<Flex
			ref={ref}
			as="header"
			position="sticky"
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
			<Flex>
				<Tooltip label="Sidebar" bg="blackAlpha.600">
					<IconButton
						aria-label="Toggle Sidebar"
						variant="ghost"
						icon={<HamburgerIcon w={5} h={5} />}
						onClick={() => setSidebarOpen(!isSidebarOpen)}
					/>
				</Tooltip>
				<Logo />
			</Flex>
			<Flex>
				<ColorModeSwitch />
				<UserMenu />
			</Flex>
		</Flex>
	)
})

export default AppBar
