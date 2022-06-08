import { CreateForm, EditForm, ListForm } from 'pages/resources/components'
import { LargeTextInput } from 'pages/resources/components/inputs'
import { TextField, TextInput } from 'react-admin'

export const CharacterCreate = () => (
	<CreateForm>
		<LargeTextInput source="name" required />
	</CreateForm>
)

export const CharacterEdit = () => (
	<EditForm actions={false}>
		<LargeTextInput source="name" required />
	</EditForm>
)

export const CharacterList = () => (
	<ListForm
		filters={[<TextInput source="name" label="fields.name" alwaysOn />]}
		sort={{ field: 'name', order: 'asc' }}
		datagridProps={{ rowClick: 'edit' }}
	>
		<TextField source="name" label="fields.name" />
	</ListForm>
)
