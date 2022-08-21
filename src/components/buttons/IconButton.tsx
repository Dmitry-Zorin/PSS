import {
	IconButton as ChakraIconButton,
	IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react'
import { Tap } from 'components'
import { useTap } from 'hooks'
import { ReactElement } from 'react'

export type IconButtonProps = Omit<ChakraIconButtonProps, 'icon'> & {
	icon: ReactElement
}

export default function IconButton({
	icon,
	variant,
	...props
}: IconButtonProps) {
	const { isTapped, listeners } = useTap()

	return (
		<ChakraIconButton
			bg={variant ? undefined : 'transparent'}
			icon={
				<Tap isTapped={isTapped} scale={0.9}>
					{icon}
				</Tap>
			}
			{...listeners}
			{...props}
		/>
	)
}
