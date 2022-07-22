import { HamburgerIcon } from '@chakra-ui/icons'
import { HStack, IconButton, StackProps } from '@chakra-ui/react'
import { ColorModeSwitch, Logo, UserMenu } from 'components'

interface AppBarProps extends StackProps {
	isSidebarOpen: boolean
	onClick: () => void
}

export default function AppBar({
	isSidebarOpen,
	onClick,
	...props
}: AppBarProps) {
	// const [isSidebarOpen, setSidebarOpen] = useSidebarState()

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
					onClick={onClick}
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
