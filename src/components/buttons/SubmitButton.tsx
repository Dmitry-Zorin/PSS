import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { LinkButton } from 'components'
import { LinkButtonProps } from './LinkButton'

export default function SubmitButton(
	props: Omit<LinkButtonProps, 'icon' | 'action'>,
) {
	return (
		<LinkButton
			type="submit"
			variant="solid"
			icon={faCheck}
			action="create"
			{...props}
		/>
	)
}
