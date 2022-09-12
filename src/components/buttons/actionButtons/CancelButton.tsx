import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { ActionButton } from 'components'
import { ActionButtonProps } from '../ActionButton'

export default function CancelButton(
	props: Omit<ActionButtonProps, 'icon' | 'action'>,
) {
	return <ActionButton icon={faCircleXmark} action="cancel" {...props} />
}
