import { ShowForm } from 'pages/resources/components'
import { TextField } from 'react-admin'

export const AuthorShow = () => (
	<ShowForm>
		<TextField source="lastName" label="fields.lastName" emptyText="-" />
		<TextField source="firstName" label="fields.firstName" emptyText="-" />
		<TextField source="middleName" label="fields.middleName" emptyText="-" />
		<TextField source="info" label="fields.info" emptyText="-" />
	</ShowForm>
)
