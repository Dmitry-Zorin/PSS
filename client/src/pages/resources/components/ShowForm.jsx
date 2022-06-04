import { Show, SimpleShowLayout, usePermissions } from 'react-admin'
import { ShowActions } from './actions'
import { Title } from './Title'

export const ShowForm = ({ children }) => {
	const permissions = usePermissions()

	return (
		<Show
			title={<Title action="show" />}
			actions={<ShowActions {...{ permissions }} />}
		>
			<SimpleShowLayout>{children}</SimpleShowLayout>
		</Show>
	)
}
