import { Create, SimpleForm } from 'react-admin'
import { Title } from './Title'

export const CreateForm = ({ children, ...props }) => (
	<Create title={<Title action="create" />} redirect="list" {...props}>
		<SimpleForm>{children}</SimpleForm>
	</Create>
)
