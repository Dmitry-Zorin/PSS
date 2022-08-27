import { faSave } from '@fortawesome/free-solid-svg-icons'
import { ActionButton } from 'components'
import { ActionButtonProps } from '../ActionButton'

export default function SaveButton(
	props: Omit<ActionButtonProps, 'icon' | 'action'>,
) {
	return (
		<ActionButton
			type="submit"
			variant="solid"
			icon={faSave}
			action="save"
			{...props}
		/>
	)
}
