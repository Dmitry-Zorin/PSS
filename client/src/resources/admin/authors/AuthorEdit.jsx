import { LargeTextInput } from '../../components/inputs'
import MyEdit from '../../MyEdit'

const AuthorEdit = () => (
	<MyEdit actions={false}>
		<LargeTextInput source="lastName" required />
		<LargeTextInput source="firstName" required />
		<LargeTextInput source="middleName" />
		<LargeTextInput source="info" />
	</MyEdit>
)

export default AuthorEdit
