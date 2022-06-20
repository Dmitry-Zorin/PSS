import { Box, Stack } from '@mui/material'
import { ReactNode } from 'react'
import {
	ChipField,
	Labeled,
	NumberInput,
	SearchInput,
	SimpleForm,
	SimpleShowLayout,
	TextField,
	TextInput,
} from 'react-admin'
import { Create, Edit, List, Show } from 'resources/components/views'
import {
	AddFileInput,
	ChipArrayField,
	DownloadFileField,
	LargeTextInput,
	ReplaceFileInput,
} from '../components'
import { AuthorsField, CharacterField } from './components/fields'
import {
	AuthorsInput,
	CharacterInput,
	CoauthorsInput,
	TypeInput,
	YearInput,
} from './components/inputs'
import ListUI from './components/ListUI'

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

export const PublicationCreate = ({ children }: { children: ReactNode }) => (
	<Create>
		<SimpleForm>
			<CreateUpdateInputs />
			{children}
			<AddFileInput />
		</SimpleForm>
	</Create>
)

export const PublicationEdit = ({ children }: { children: ReactNode }) => (
	<Edit>
		<SimpleForm>
			<CreateUpdateInputs />
			{children}
			<ReplaceFileInput />
		</SimpleForm>
	</Edit>
)

export const PublicationList = () => (
	<List
		filters={[
			<SearchInput
				source="title"
				label="fields.search"
				sx={{ ml: 2 }}
				alwaysOn
			/>,
			<TextInput source="description" label="fields.description" />,
			<NumberInput source="publication.year" label="fields.year" />,
			<TextInput source="publication.authors.author" label="fields.author" />,
			<TextInput source="publication.outputData" label="fields.outputData" />,
		]}
	>
		<ListUI>
			<TextField source="title" label="fields.title" />
			<AuthorsField label="fields.authors" />
			<ChipField source="publication.year" label="fields.year" emptyText="-" />
		</ListUI>
	</List>
)

export const PublicationShow = ({ children }: { children: ReactNode }) => (
	<Show>
		<Stack spacing={3} sx={{ px: 2, py: 1 }}>
			<TextField source="title" variant="h4" sx={{ mb: 3 }} />
			<TextField source="description" variant="body1" />
		</Stack>
		<Box
			sx={{
				display: 'grid',
				mt: 5,
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
		<SimpleShowLayout spacing={3}>
			<TextField
				source="publication.outputData"
				label="fields.outputData"
				emptyText="-"
			/>
			{children}
			<DownloadFileField />
		</SimpleShowLayout>
	</Show>
)
