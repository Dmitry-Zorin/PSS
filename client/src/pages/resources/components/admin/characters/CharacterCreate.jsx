import { CreateForm } from 'pages/resources/components'
import { LargeTextInput } from 'pages/resources/components/inputs'

export const CharacterCreate = () => (
	<CreateForm>
		<LargeTextInput source="name" required />
	</CreateForm>
)
