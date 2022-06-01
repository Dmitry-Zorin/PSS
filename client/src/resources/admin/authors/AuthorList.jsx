import React from 'react'
import { TextField, TextInput, useRecordContext } from 'react-admin'
import MyList from '../../MyList'

const DatagridExpand = () => {
	const record = useRecordContext()
	return <div>{record?.info || 'No info //'}</div>
}

const AuthorList = () => (
	<MyList
		filters={[
			<TextInput source="lastName" label="fields.lastName" alwaysOn />,
			<TextInput source="firstName" label="fields.firstName" />,
			<TextInput source="middleName" label="fields.middleName" />,
		]}
		sort={{ field: 'lastName', order: 'asc' }}
		datagridProps={{ rowClick: 'show', expand: DatagridExpand }}
	>
		<TextField source="lastName" label="fields.lastName" />
		<TextField source="firstName" label="fields.firstName" />
		<TextField source="middleName" label="fields.middleName" />
	</MyList>
)

export default AuthorList
