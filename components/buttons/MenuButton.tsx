import {
	IconButton,
	MenuButton as ChakraMenuButton,
	MenuButtonProps,
} from '@chakra-ui/react'
import { Tap } from 'components'
import { useTap } from 'hooks'
import { ReactElement } from 'react'

export default function MenuButton({
	icon,
	...props
}: Omit<MenuButtonProps, 'icon'> & { icon: ReactElement }) {
	const { isTapped, listeners } = useTap()

	return (
		<ChakraMenuButton
			as={IconButton}
			icon={<Tap isTapped={isTapped}>{icon}</Tap>}
			{...listeners}
			{...props}
		/>
	)
}
