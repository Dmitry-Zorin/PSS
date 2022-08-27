import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { ActionButton } from 'components'
import { ActionButtonProps } from '../ActionButton'

export default function SubmitButton(
	props: Omit<ActionButtonProps, 'icon' | 'action'>,
) {
	return (
		<ActionButton
			type="submit"
			variant="solid"
			icon={faCheck}
			action="create"
			{...props}
		/>
	)
}
