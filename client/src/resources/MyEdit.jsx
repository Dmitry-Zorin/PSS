import React from 'react'
import { Edit, SimpleForm, useResourceContext } from 'react-admin'

const MyEdit = ({ children }) => {
	const resource = useResourceContext()

	return (
		<Edit title={`resources.${resource}.titles.edit`}>
			<SimpleForm>
				{children}
			</SimpleForm>
		</Edit>
	)
}

export default MyEdit
