import { Box, Card, Divider, Stack, Typography } from '@mui/material'
import type { ReactElement } from 'react'
import {
	SimpleForm,
	TextField,
	TextInput,
	useRecordContext,
	useTranslate,
} from 'react-admin'
import {
	Create,
	Edit,
	LargeTextInput,
	List,
	Show,
} from '~/resources/components'
import DownloadPublicationListButton from './DownloadPublicationListButton'
import ListUI from './ListUI'
import type { Author } from './types'

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

export function getAuthorName(author: Author) {
	return `${author.firstName} ${author.lastName}`
}

export function getAuthorFullName(author: Author) {
	const { firstName, middleName, lastName } = author
	const isEnglishName = /\w/.test(firstName)
	const fullEnglishName = `${firstName} ${middleName} ${lastName}`
	const fullRussianName = `${lastName} ${firstName} ${middleName}`

	return middleName
		? isEnglishName
			? fullEnglishName
			: fullRussianName
		: getAuthorName(author)
}

const NameField = () => {
	const author = useRecordContext<Author>()

	return (
		<Typography variant="h4" align="center">
			{getAuthorFullName(author)}
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
		<div>
			<Typography variant="body2" color="text.secondary" mb={1}>
				{translate(label || children.props.label)}
			</Typography>
			<Box
				sx={{
					'*': {
						fontSize: '1.1rem !important',
					},
				}}
			>
				{children}
			</Box>
		</div>
	)
}

export const AuthorShow = () => (
	<Show>
		<Card sx={{ px: 3, py: 5 }}>
			<Stack spacing={5}>
				<NameField />
				<Divider />
				<LabeledCard>
					<TextField source="info" label="fields.info" emptyText="-" />
				</LabeledCard>
				<Box display="flex" justifyContent="center" pt={5}>
					<DownloadPublicationListButton />
				</Box>
			</Stack>
		</Card>
	</Show>
)
