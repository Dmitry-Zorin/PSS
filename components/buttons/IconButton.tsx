import {
	IconButton as ChakraIconButton,
	IconButtonProps,
} from '@chakra-ui/react'
import { Tap } from 'components'
import { useTap } from 'hooks'
import { ReactElement } from 'react'

export default function IconButton({
	icon,
	...props
}: Omit<IconButtonProps, 'icon'> & { icon: ReactElement }) {
	const { isTapped, listeners } = useTap()

	return (
		<ChakraIconButton
			icon={<Tap isTapped={isTapped}>{icon}</Tap>}
			{...listeners}
			{...props}
		/>
	)
}
