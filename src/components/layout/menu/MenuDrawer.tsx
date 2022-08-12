import {
	Center,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	DrawerProps,
} from '@chakra-ui/react'
import { Logo } from 'components'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function MenuDrawer({
	children,
	onClose,
	...props
}: DrawerProps) {
	const router = useRouter()

	useEffect(() => {
		onClose()
	}, [onClose, router.asPath])

	return (
		<Drawer placement="left" size="xs" onClose={onClose} {...props}>
			<DrawerOverlay />
			<DrawerContent px={2}>
				<Center py={2}>
					<Logo />
				</Center>
				{children}
			</DrawerContent>
		</Drawer>
	)
}
