import { faEdit, faTableList } from '@fortawesome/free-solid-svg-icons'
import { LinkButton } from 'components'
import { LinkButtonProps } from './LinkButton'

export default function EditButton(
	props: Omit<LinkButtonProps, 'icon' | 'action'>,
) {
	return <LinkButton icon={faEdit} action="edit" {...props} />
}
