import { EditForm } from 'pages/resources/components'
import { ReplaceFileInput } from '../inputs'
import { CreateUpdateInputs } from './PublicationCreate'

export const PublicationEdit = ({ children }) => (
	<EditForm>
		<CreateUpdateInputs />
		{children}
		<ReplaceFileInput />
	</EditForm>
)
