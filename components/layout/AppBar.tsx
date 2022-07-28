import { Box, HStack, IconButton, StackProps } from '@chakra-ui/react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { ColorModeSwitch, Icon, UserMenu } from 'components'

interface AppBarProps extends StackProps {
	onSidebarDrawerOpen: () => void
}

export default function AppBar({ onSidebarDrawerOpen, ...props }: AppBarProps) {
	return (
		<HStack justify="flex-end" p={4} {...props}>
			<Box display={{ base: 'block', md: 'none' }} flexGrow={1}>
				<IconButton
					aria-label="Toggle Sidebar"
					icon={<Icon icon={faBars} boxSize={6} transform="scaleY(0.85)" />}
					onClick={onSidebarDrawerOpen}
				/>
			</Box>
			<ColorModeSwitch />
			<UserMenu />
		</HStack>
	)
}
