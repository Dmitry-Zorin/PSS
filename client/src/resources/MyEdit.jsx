import React from 'react'
import { Edit, SimpleForm, useResourceContext } from 'react-admin'

const MyEdit = ({ children, ...props }) => {
	const resource = useResourceContext()

	return (
		<Edit title={`resources.${resource}.titles.edit`} {...props}>
			<SimpleForm children={children}/>
		</Edit>
	)
}

export default MyEdit
