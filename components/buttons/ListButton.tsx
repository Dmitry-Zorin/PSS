import { faTableList } from '@fortawesome/free-solid-svg-icons'
import { LinkButton } from 'components'
import { LinkButtonProps } from './LinkButton'

export default function ListButton(
	props: Omit<LinkButtonProps, 'icon' | 'action'>,
) {
	return <LinkButton icon={faTableList} action="list" {...props} />
}
