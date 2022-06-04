import { EditForm } from 'pages/resources/components'
import { LargeTextInput } from 'pages/resources/components/inputs'

export const CharacterEdit = () => (
	<EditForm actions={false}>
		<LargeTextInput source="name" required />
	</EditForm>
)
