import { Edit, SimpleForm } from 'react-admin'
import { Title } from './Title'

export const EditForm = ({ children, ...props }) => (
	<Edit title={<Title action="edit" />} {...props}>
		<SimpleForm>{children}</SimpleForm>
	</Edit>
)
