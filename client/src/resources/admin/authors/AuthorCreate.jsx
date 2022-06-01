import { LargeTextInput } from '../../components/inputs'
import MyCreate from '../../MyCreate'

const AuthorCreate = () => (
	<MyCreate>
		<LargeTextInput source="lastName" required />
		<LargeTextInput source="firstName" required />
		<LargeTextInput source="middleName" />
		<LargeTextInput source="info" />
	</MyCreate>
)

export default AuthorCreate
