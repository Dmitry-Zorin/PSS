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
		<Drawer placement="left" size="xs" {...props}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>
					<Logo />
				</DrawerHeader>
				{children}
			</DrawerContent>
		</Drawer>
	)
}
