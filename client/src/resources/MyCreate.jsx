import React from 'react'
import { Create, SimpleForm, useResourceContext } from 'react-admin'

const MyCreate = ({ children }) => {
	const resource = useResourceContext()

	return (
		<Create
			title={`resources.${resource}.titles.create`}
			redirect='list'
		>
			<SimpleForm>
				{children}
			</SimpleForm>
		</Create>
	)
}

export default MyCreate
