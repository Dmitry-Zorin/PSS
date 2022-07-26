import { HamburgerIcon } from '@chakra-ui/icons'
import { HStack, IconButton, StackProps } from '@chakra-ui/react'
import { ColorModeSwitch, Logo, UserMenu } from 'components'

interface AppBarProps extends StackProps {
	onClick: () => void
}

export default function AppBar({ onClick, ...props }: AppBarProps) {
	return (
		<HStack
			as="header"
			pos="sticky"
			top={0}
			zIndex="overlay"
			bg="bg"
			color="text-secondary-on-layer-1"
			// borderY="1px"
			// borderColor="border"
			justify="space-between"
			align="center"
			px={4}
			{...props}
		>
			<HStack spacing={0}>
				<IconButton
					aria-label="Toggle Sidebar"
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
