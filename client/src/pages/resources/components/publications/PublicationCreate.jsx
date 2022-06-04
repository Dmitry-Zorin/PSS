import { NumberInput } from 'react-admin'
import { CreateForm } from '..'
import {
	AddFileInput,
	AuthorsInput,
	CharacterInput,
	CoauthorsInput,
	LargeTextInput,
	TypeInput,
	YearInput,
} from '../inputs'

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

export const PublicationCreate = ({ children }) => (
	<CreateForm>
		<CreateUpdateInputs />
		{children}
		<AddFileInput />
	</CreateForm>
)
