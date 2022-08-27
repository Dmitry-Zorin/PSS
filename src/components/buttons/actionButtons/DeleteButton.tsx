import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ActionButton } from 'components'
import { ActionButtonProps } from '../ActionButton'

export default function DeleteButton(
	props: Omit<ActionButtonProps, 'icon' | 'action'>,
) {
	return (
		<ActionButton
			icon={faTrashCan}
			action="delete"
			colorScheme="red"
			{...props}
		/>
	)
}
