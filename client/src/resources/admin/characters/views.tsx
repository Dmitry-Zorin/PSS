import { SimpleForm, TextField, TextInput } from 'react-admin'
import { Create, Edit, List } from 'resources/components'
import { LargeTextInput } from 'resources/components/inputs'
import ListUI from './ListUI'

export const CharacterCreate = () => (
	<Create>
		<SimpleForm>
			<LargeTextInput source="name" required />
		</SimpleForm>
	</Create>
)

export const CharacterEdit = () => (
	<Edit actions={false}>
		<SimpleForm>
			<LargeTextInput source="name" required />
		</SimpleForm>
	</Edit>
)

export const CharacterList = () => (
	<List
		filters={[<TextInput source="name" label="fields.name" alwaysOn />]}
		sort={{ field: 'name', order: 'asc' }}
	>
		<ListUI>
			<TextField source="name" label="fields.name" />
		</ListUI>
	</List>
)
