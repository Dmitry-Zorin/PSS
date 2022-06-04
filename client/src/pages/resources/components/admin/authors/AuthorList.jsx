import { TextField, TextInput, useRecordContext } from 'react-admin'
import { ListForm } from 'pages/resources/components'

const DatagridExpand = () => {
	const record = useRecordContext()
	return <div>{record?.info || 'No info //'}</div>
}

export const AuthorList = () => (
	<ListForm
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
	</ListForm>
)
