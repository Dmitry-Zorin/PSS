import React from 'react'
import { Create, SimpleForm, useResourceContext } from 'react-admin'

const MyCreate = ({ children, ...props }) => {
	const resource = useResourceContext()

	return (
		<Create
			title={`resources.${resource}.titles.create`}
			redirect='list'
			{...props}
		>
			<SimpleForm children={children}/>
		</Create>
	)
}

export default MyCreate
