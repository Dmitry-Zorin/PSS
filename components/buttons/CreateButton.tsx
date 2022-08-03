import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { LinkButton } from 'components'
import { LinkButtonProps } from './LinkButton'

export default function CreateButton(
	props: Omit<LinkButtonProps, 'icon' | 'action'>,
) {
	return <LinkButton icon={faAdd} action="create" {...props} />
}
