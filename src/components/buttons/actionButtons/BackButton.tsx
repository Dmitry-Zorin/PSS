import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { ActionButton } from 'components'
import { useRouter } from 'next/router'
import { ActionButtonProps } from '../ActionButton'

export default function BackButton(
	props: Omit<ActionButtonProps, 'icon' | 'action'>,
) {
	const router = useRouter()
	return (
		<ActionButton
			icon={faAngleLeft}
			action="back"
			onClick={router.back}
			{...props}
		/>
	)
}
