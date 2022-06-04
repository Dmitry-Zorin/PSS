import { CreateForm } from 'pages/resources/components'
import { LargeTextInput } from 'pages/resources/components/inputs'

export const AuthorCreate = () => (
	<CreateForm>
		<LargeTextInput source="lastName" required />
		<LargeTextInput source="firstName" required />
		<LargeTextInput source="middleName" />
		<LargeTextInput source="info" />
	</CreateForm>
)
