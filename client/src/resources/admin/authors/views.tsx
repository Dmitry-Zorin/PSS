import { SimpleForm, TextField, TextInput } from 'react-admin'
import { Create, Edit, LargeTextInput, List, Show } from 'resources/components'
import ListUI from './ListUI'

export const AuthorCreate = () => (
	<Create>
		<SimpleForm>
			<LargeTextInput source="lastName" required />
			<LargeTextInput source="firstName" required />
			<LargeTextInput source="middleName" />
			<LargeTextInput source="info" />
		</SimpleForm>
	</Create>
)

export const AuthorEdit = () => (
	<Edit actions={false}>
		<SimpleForm>
			<LargeTextInput source="lastName" required />
			<LargeTextInput source="firstName" required />
			<LargeTextInput source="middleName" />
			<LargeTextInput source="info" />
		</SimpleForm>
	</Edit>
)

export const AuthorList = () => (
	<List
		filters={[
			<TextInput source="lastName" label="fields.lastName" alwaysOn />,
			<TextInput source="firstName" label="fields.firstName" />,
			<TextInput source="middleName" label="fields.middleName" />,
		]}
		sort={{ field: 'lastName', order: 'asc' }}
	>
		<ListUI>
			<TextField source="lastName" label="fields.lastName" />
			<TextField source="firstName" label="fields.firstName" />
			<TextField source="middleName" label="fields.middleName" />
		</ListUI>
	</List>
)

export const AuthorShow = () => (
	<Show>
		<TextField source="lastName" label="fields.lastName" emptyText="-" />
		<TextField source="firstName" label="fields.firstName" emptyText="-" />
		<TextField source="middleName" label="fields.middleName" emptyText="-" />
		<TextField source="info" label="fields.info" emptyText="-" />
	</Show>
)
