import {
	Drawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	DrawerProps,
} from '@chakra-ui/react'
import { Logo } from 'components'

export default function SidebarDrawer({ children, ...props }: DrawerProps) {
	return (
		<Drawer placement="left" {...props}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton size="lg" color="text-secondary" />
				<DrawerHeader>
					<Logo />
				</DrawerHeader>
				{children}
			</DrawerContent>
		</Drawer>
	)
}
