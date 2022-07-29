import { Box, HStack, IconButton, StackProps } from '@chakra-ui/react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { ColorModeSwitch, Icon, UserMenu } from 'components'

interface AppBarProps extends StackProps {
	onMenuDrawerOpen: () => void
}

export default function AppBar({ onMenuDrawerOpen, ...props }: AppBarProps) {
	return (
		<HStack
			spacing={0}
			justify="flex-end"
			color="text-tertiary"
			p={4}
			{...props}
		>
			<Box display={{ base: 'block', md: 'none' }} flexGrow={1}>
				<IconButton
					aria-label="Toggle Menu"
					icon={<Icon icon={faBars} boxSize={6} transform="scaleY(0.85)" />}
					onClick={onMenuDrawerOpen}
				/>
			</Box>
			<ColorModeSwitch />
			<UserMenu />
		</HStack>
	)
}
