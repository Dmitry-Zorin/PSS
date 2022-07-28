import {
	Drawer,
	DrawerContent,
	DrawerOverlay,
	DrawerProps,
	HStack,
	IconButton,
} from '@chakra-ui/react'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Icon, Logo } from 'components'

export default function MenuDrawer({ children, ...props }: DrawerProps) {
	return (
		<Drawer placement="left" size="xs" {...props}>
			<DrawerOverlay />
			<DrawerContent px={4}>
				<HStack justify="space-between" pl={4} py={2}>
					<Logo />
					<IconButton
						aria-label="Close"
						icon={<Icon icon={faClose} boxSize={6} />}
						onClick={props.onClose}
					/>
				</HStack>
				{children}
			</DrawerContent>
		</Drawer>
	)
}
