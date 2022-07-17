import { HamburgerIcon } from '@chakra-ui/icons'
import { HStack, IconButton, StackProps } from '@chakra-ui/react'
import { ColorModeSwitch, Logo, useSidebarState } from 'components'
import UserMenu from '../UserMenu'

export default function AppBar(props: StackProps) {
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()

	return (
		<HStack
			as="header"
			bg="chakra-body-bg"
			color="text-secondary"
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
		</HStack>
	)
}
