import { HamburgerIcon } from '@chakra-ui/icons'
import { HStack, IconButton, StackProps } from '@chakra-ui/react'
import { ColorModeSwitch, Logo, useSidebarState } from 'components'
import UserMenu from '../UserMenu'

export default function AppBar(props: StackProps) {
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()

	return (
		<HStack
			as="header"
			bg="bg"
			color="text-secondary"
			justify="space-between"
			align="center"
			px={4}
			{...props}
		>
			<HStack>
				<IconButton
					aria-label="Toggle Sidebar"
					variant="unstyled"
					icon={<HamburgerIcon boxSize={5} />}
					onClick={() => setSidebarOpen(!isSidebarOpen)}
				/>
				<Logo />
			</HStack>
			<HStack>
				<ColorModeSwitch />
				<div>
					<UserMenu />
				</div>
			</HStack>
		</HStack>
	)
}
