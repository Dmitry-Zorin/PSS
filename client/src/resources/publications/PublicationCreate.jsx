import { NumberInput } from 'react-admin'
import {
	AddFileInput,
	AuthorsInput,
	CharacterInput,
	CoauthorsInput,
	LargeTextInput,
	TypeInput,
	YearInput,
} from '../components/inputs'
import MyCreate from '../MyCreate'

export const CreateUpdateInputs = () => (
	<>
		<LargeTextInput source="title" required />
		<LargeTextInput source="description" />
		<TypeInput />
		<YearInput />
		<NumberInput source="volume" label="fields.volume" />
		<AuthorsInput />
		<CoauthorsInput />
		<CharacterInput />
		<LargeTextInput source="outputData" />
	</>
)

const PublicationCreate = ({ children }) => (
	<MyCreate>
		<CreateUpdateInputs />
		{children}
		<AddFileInput />
	</MyCreate>
)

export default PublicationCreate
