import { IconButton, MenuButton, MenuButtonProps } from '@chakra-ui/react'
import { Tap } from 'components'
import { useTap } from 'hooks'
import { IconButtonProps } from './IconButton'

type MenuIconButtonProps = MenuButtonProps & IconButtonProps

export default function MenuIconButton({
	icon,
	...props
}: MenuIconButtonProps) {
	const { isTapped, listeners } = useTap()

	return (
		<MenuButton
			as={IconButton}
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
