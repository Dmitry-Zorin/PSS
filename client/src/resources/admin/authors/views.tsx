import { Box, Card, Typography } from '@mui/material'
import { ReactElement } from 'react'
import {
	SimpleForm,
	SimpleShowLayout,
	TextField,
	TextInput,
	useRecordContext,
	useTranslate,
} from 'react-admin'
import { Create, Edit, LargeTextInput, List, Show } from 'resources/components'
import ListUI from './ListUI'

export const AuthorCreate = () => (
	<Create>
		<SimpleForm>
			<LargeTextInput source="lastName" required />
			<LargeTextInput source="firstName" required />
			<LargeTextInput source="middleName" />
			<LargeTextInput source="info" />
		</SimpleForm>
	</Create>
)

export const AuthorEdit = () => (
	<Edit actions={false}>
		<SimpleForm>
			<LargeTextInput source="lastName" required />
			<LargeTextInput source="firstName" required />
			<LargeTextInput source="middleName" />
			<LargeTextInput source="info" />
		</SimpleForm>
	</Edit>
)

export const AuthorList = () => (
	<List
		filters={[
			<TextInput source="lastName" label="fields.lastName" alwaysOn />,
			<TextInput source="firstName" label="fields.firstName" />,
			<TextInput source="middleName" label="fields.middleName" />,
		]}
		sort={{ field: 'lastName', order: 'asc' }}
	>
		<ListUI>
			<TextField source="lastName" label="fields.lastName" />
			<TextField source="firstName" label="fields.firstName" />
			<TextField source="middleName" label="fields.middleName" />
		</ListUI>
	</List>
)

const NameField = () => {
	const { firstName, middleName, lastName } = useRecordContext()

	return (
		<Typography variant="h5" align="center" mb={3}>
			{middleName
				? `${lastName} ${firstName} ${middleName}`
				: `${firstName} ${lastName}`}
		</Typography>
	)
}

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

export const AuthorShow = () => (
	<Show>
		<SimpleShowLayout>
			<NameField />
			<LabeledCard>
				<TextField source="info" label="fields.info" emptyText="-" />
			</LabeledCard>
		</SimpleShowLayout>
	</Show>
)
