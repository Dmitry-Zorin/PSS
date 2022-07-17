import { HamburgerIcon } from '@chakra-ui/icons'
import { Flex, FlexProps, HStack, IconButton } from '@chakra-ui/react'
import { ColorModeSwitch, Logo, useSidebarState } from 'components'
import UserMenu from '../UserMenu'

export default function AppBar(props: FlexProps) {
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()

	return (
		<Flex
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
			{...props}
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
}
