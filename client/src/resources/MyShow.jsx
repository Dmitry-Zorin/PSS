import React from 'react'
import { Show, SimpleShowLayout, usePermissions, useResourceContext } from 'react-admin'
import { ShowActions } from './components/old'

const MyShow = ({ children }) => {
	const resource = useResourceContext()
	const permissions = usePermissions()

	return (
		<Show
			title={`resources.${resource}.titles.show`}
			actions={<ShowActions {...{ permissions }}/>}
		>
			<SimpleShowLayout children={children}/>
		</Show>
	)
}

export default MyShow
