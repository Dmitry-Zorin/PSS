import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { LinkButton } from 'components'
import { LinkButtonProps } from './LinkButton'

export default function DeleteButton(
	props: Omit<LinkButtonProps, 'icon' | 'action'>,
) {
	return (
		<LinkButton
			icon={faTrashCan}
			action="delete"
			colorScheme="red"
			{...props}
		/>
	)
}
