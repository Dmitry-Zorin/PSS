import { ListForm } from 'pages/resources/components'
import { TextField, TextInput } from 'react-admin'

export const CharacterList = () => (
	<ListForm
		filters={[<TextInput source="name" label="fields.name" alwaysOn />]}
		sort={{ field: 'name', order: 'asc' }}
		datagridProps={{ rowClick: 'edit' }}
	>
		<TextField source="name" label="fields.name" />
	</ListForm>
)
