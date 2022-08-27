import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { ActionButton } from 'components'
import { ActionButtonProps } from '../ActionButton'

export default function CreateButton(
	props: Omit<ActionButtonProps, 'icon' | 'action'>,
) {
	return <ActionButton icon={faAdd} action="create" {...props} />
}
