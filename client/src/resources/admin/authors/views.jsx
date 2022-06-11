import { CreateForm, EditForm, ListForm, ShowForm } from 'resources/components'
import { LargeTextInput } from 'resources/components/inputs'
import { TextField, TextInput, useRecordContext } from 'react-admin'

const DatagridExpand = () => {
	const record = useRecordContext()
	return <div>{record?.info || 'No info //'}</div>
}

export const AuthorCreate = () => (
	<CreateForm>
		<LargeTextInput source="lastName" required />
		<LargeTextInput source="firstName" required />
		<LargeTextInput source="middleName" />
		<LargeTextInput source="info" />
	</CreateForm>
)

export const AuthorEdit = () => (
	<EditForm actions={false}>
		<LargeTextInput source="lastName" required />
		<LargeTextInput source="firstName" required />
		<LargeTextInput source="middleName" />
		<LargeTextInput source="info" />
	</EditForm>
)

export const AuthorList = () => (
	<ListForm
		filters={[
			<TextInput source="lastName" label="fields.lastName" alwaysOn />,
			<TextInput source="firstName" label="fields.firstName" />,
			<TextInput source="middleName" label="fields.middleName" />,
		]}
		sort={{ field: 'lastName', order: 'asc' }}
		datagridProps={{ rowClick: 'show', expand: <DatagridExpand /> }}
	>
		<TextField source="lastName" label="fields.lastName" />
		<TextField source="firstName" label="fields.firstName" />
		<TextField source="middleName" label="fields.middleName" />
	</ListForm>
)

export const AuthorShow = () => (
	<ShowForm>
		<TextField source="lastName" label="fields.lastName" emptyText="-" />
		<TextField source="firstName" label="fields.firstName" emptyText="-" />
		<TextField source="middleName" label="fields.middleName" emptyText="-" />
		<TextField source="info" label="fields.info" emptyText="-" />
	</ShowForm>
)
