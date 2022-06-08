import { Divider, Stack } from '@mui/material'
import { Box } from '@mui/system'
import {
	ChipField,
	Labeled,
	NumberInput,
	SimpleShowLayout,
	TextField,
	TextInput,
} from 'react-admin'
import {
	AddFileInput,
	ChipArrayField,
	CreateForm,
	DownloadFileField,
	EditForm,
	LargeTextInput,
	ListForm,
	ReplaceFileInput,
	ShowForm,
} from '../components'
import { AuthorsField, CharacterField } from './components/fields'
import {
	AuthorsInput,
	CharacterInput,
	CoauthorsInput,
	TypeInput,
	YearInput,
} from './components/inputs'

export const CreateUpdateInputs = () => (
	<>
		<LargeTextInput source="title" required />
		<LargeTextInput source="description" />
		<TypeInput />
		<YearInput />
		<NumberInput source="publication.volume" label="fields.volume" />
		<AuthorsInput />
		<CoauthorsInput />
		<CharacterInput />
		<LargeTextInput source="publication.outputData" label="fields.outputData" />
	</>
)

export const PublicationCreate = ({ children }) => (
	<CreateForm>
		<CreateUpdateInputs />
		{children}
		<AddFileInput />
	</CreateForm>
)

export const PublicationEdit = ({ children }) => (
	<EditForm>
		<CreateUpdateInputs />
		{children}
		<ReplaceFileInput />
	</EditForm>
)

export const PublicationList = ({ children }) => (
	<ListForm
		filters={[
			<TextInput source="title" label="fields.search" alwaysOn />,
			<TextInput source="description" label="fields.description" />,
			<NumberInput source="publication.year" label="fields.year" />,
			<TextInput source="publication.authors.author" label="fields.author" />,
			<TextInput source="publication.outputData" label="fields.outputData" />,
		]}
	>
		<TextField source="title" label="fields.title" />
		{children}
		<AuthorsField />
		<ChipField source="publication.year" label="fields.year" emptyText="-" />
	</ListForm>
)

export const PublicationShow = ({ children }) => (
	<ShowForm>
		<Stack spacing={2} sx={{ px: 2, py: 1 }}>
			<TextField source="title" sx={{ fontSize: '1.2rem', fontWeight: 450 }} />
			<TextField source="description" />
		</Stack>
		<Divider sx={{ m: 4 }} />
		<Box
			sx={{
				display: 'grid',
				px: 2,
				py: 1,
				rowGap: 3,
				columnGap: 1,
				gridTemplateColumns: 'repeat(2, 1fr)',
			}}
		>
			<Labeled>
				<TextField
					source="publication.type"
					label="fields.type"
					emptyText="-"
				/>
			</Labeled>
			<Labeled label="fields.character">
				<CharacterField />
			</Labeled>
			<div>
				<Labeled>
					<ChipField
						source="publication.year"
						label="fields.year"
						emptyText="-"
					/>
				</Labeled>
			</div>
			<Labeled>
				<ChipField
					source="publication.volume"
					label="fields.volume"
					emptyText="-"
				/>
			</Labeled>
			<Labeled label="fields.authors">
				<AuthorsField />
			</Labeled>
			<Labeled>
				<ChipArrayField
					source="publication.coauthors"
					fieldSource="name"
					label="fields.coauthors"
				/>
			</Labeled>
		</Box>
		<Divider sx={{ m: 4 }} />
		<SimpleShowLayout spacing={3}>
			<TextField
				source="publication.outputData"
				label="fields.outputData"
				emptyText="-"
			/>
			{children}
			<DownloadFileField />
		</SimpleShowLayout>
	</ShowForm>
)
