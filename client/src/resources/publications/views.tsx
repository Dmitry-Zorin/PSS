import { Box, Card, Grid, Toolbar, Typography } from '@mui/material'
import { truncate } from 'lodash'
import { ReactElement, ReactNode } from 'react'
import {
	FunctionField,
	NumberInput,
	SimpleForm,
	TextField,
	TextInput,
	useTranslate,
} from 'react-admin'
import { Create, Edit, List, Show } from 'resources/components/views'
import {
	AddFileInput,
	ChipArrayField,
	DownloadFileField,
	LargeTextInput,
	ReplaceFileInput,
} from '../components'
import { AuthorsField, CharacterField } from './fields'
import {
	AuthorsInput,
	CharacterInput,
	CoauthorsInput,
	TypeInput,
	YearInput,
} from './inputs'
import ListUI from './ListUI'

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

export const PublicationCreate = ({ children }: { children?: ReactNode }) => (
	<Create>
		<SimpleForm>
			<CreateUpdateInputs />
			{children}
			<AddFileInput />
		</SimpleForm>
	</Create>
)

export const PublicationEdit = ({ children }: { children?: ReactNode }) => (
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
			<TextInput
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
			<FunctionField
				render={(record) => {
					return truncate(record.description, { length: 100 })
				}}
				label="fields.description"
			/>
			<AuthorsField label="fields.authors" />
			<TextField source="publication.year" label="fields.year" emptyText="-" />
		</ListUI>
	</List>
)

const LabeledCard = ({
	children,
	label,
}: {
	children: ReactElement
	label?: string
}) => {
	const translate = useTranslate()

	return (
		<Card sx={{ p: 2 }}>
			<Typography variant="body2" color="text.secondary" align="center" mb={1}>
				{translate(label || children.props.label)}
			</Typography>
			<Box
				textAlign="center"
				sx={{
					'*': {
						fontSize: '1.2rem !important',
					},
				}}
			>
				{children}
			</Box>
		</Card>
	)
}

export const PublicationShow = ({ children }: { children?: ReactNode }) => (
	<Show>
		<TextField source="description" fontSize="1.1rem" />
		<Grid container spacing={3} justifyContent="space-between" mt={6}>
			<Grid item xs={6} md={3}>
				<LabeledCard>
					<TextField
						source="publication.type"
						label="fields.type"
						emptyText="-"
					/>
				</LabeledCard>
			</Grid>
			<Grid item xs={6} md={3}>
				<LabeledCard label="fields.character">
					<CharacterField />
				</LabeledCard>
			</Grid>
			<Grid item xs={6} md={3}>
				<LabeledCard>
					<TextField
						source="publication.year"
						label="fields.year"
						emptyText="-"
					/>
				</LabeledCard>
			</Grid>
			<Grid item xs={6} md={3}>
				<LabeledCard>
					<TextField
						source="publication.volume"
						label="fields.volume"
						emptyText="-"
					/>
				</LabeledCard>
			</Grid>
			<Grid item xs={12} md={6}>
				<LabeledCard label="fields.authors">
					<AuthorsField />
				</LabeledCard>
			</Grid>
			<Grid item xs={12} md={6}>
				<LabeledCard>
					<ChipArrayField
						source="publication.coauthors"
						fieldSource="name"
						label="fields.coauthors"
					/>
				</LabeledCard>
			</Grid>
		</Grid>
		<FunctionField
			render={(record: any) => {
				return (
					record.publication.outputData && (
						<Grid item xs={12}>
							<LabeledCard>
								<TextField
									source="publication.outputData"
									label="fields.outputData"
								/>
							</LabeledCard>
						</Grid>
					)
				)
			}}
		/>
		{children}
		<Toolbar disableGutters>
			<DownloadFileField />
		</Toolbar>
	</Show>
)
