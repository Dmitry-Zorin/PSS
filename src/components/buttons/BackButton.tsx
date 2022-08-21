import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { LinkButton } from 'components'
import { useRouter } from 'next/router'
import { LinkButtonProps } from './LinkButton'

export default function BackButton(
	props: Omit<LinkButtonProps, 'icon' | 'action'>,
) {
	const router = useRouter()
	return (
		<LinkButton
			icon={faAngleLeft}
			action="back"
			onClick={router.back}
			{...props}
		/>
	)
}
