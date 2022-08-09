import { faSave } from '@fortawesome/free-solid-svg-icons'
import { LinkButton } from 'components'
import { LinkButtonProps } from './LinkButton'

export default function SaveButton(
	props: Omit<LinkButtonProps, 'icon' | 'action'>,
) {
	return (
		<LinkButton
			type="submit"
			variant="solid"
			icon={faSave}
			action="save"
			{...props}
		/>
	)
}
