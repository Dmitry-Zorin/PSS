import { EditForm } from 'pages/resources/components'
import { LargeTextInput } from 'pages/resources/components/inputs'

export const AuthorEdit = () => (
	<EditForm actions={false}>
		<LargeTextInput source="lastName" required />
		<LargeTextInput source="firstName" required />
		<LargeTextInput source="middleName" />
		<LargeTextInput source="info" />
	</EditForm>
)
