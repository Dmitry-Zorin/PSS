import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { ActionButton } from 'components'
import { ActionButtonProps } from '../ActionButton'

export default function EditButton(
	props: Omit<ActionButtonProps, 'icon' | 'action'>,
) {
	return <ActionButton icon={faEdit} action="edit" {...props} />
}
