import {
	Drawer,
	DrawerContent,
	DrawerOverlay,
	DrawerProps,
	HStack,
} from '@chakra-ui/react'
import { Logo } from 'components'

export default function MenuDrawer({ children, ...props }: DrawerProps) {
	return (
		<Drawer placement="left" size="xs" {...props}>
			<DrawerOverlay />
			<DrawerContent px={2}>
				<HStack justify="space-between" pl={4} py={2}>
					<Logo />
				</HStack>
				{children}
			</DrawerContent>
		</Drawer>
	)
}
