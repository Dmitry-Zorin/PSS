import { HamburgerIcon } from '@chakra-ui/icons'
import { HStack, IconButton, StackProps } from '@chakra-ui/react'
import { ColorModeSwitch, Logo, UserMenu } from 'components'
import { useSidebarState } from 'hooks'

export default function AppBar(props: StackProps) {
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()

	return (
		<HStack
			as="header"
			zIndex="overlay"
			bg="bg-secondary"
			color="text-secondary"
			justify="space-between"
			align="center"
			px={4}
			{...props}
		>
			<HStack spacing={0}>
				<IconButton
					aria-label="Toggle Sidebar"
					variant="unstyled"
					borderRadius="full"
					icon={<HamburgerIcon boxSize={6} />}
					onClick={() => setSidebarOpen(!isSidebarOpen)}
				/>
				<Logo />
			</HStack>
			<HStack spacing={0}>
				<ColorModeSwitch />
				<UserMenu />
			</HStack>
		</HStack>
	)
}
