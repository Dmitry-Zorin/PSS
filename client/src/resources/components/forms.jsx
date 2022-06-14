import { styled, Typography, useMediaQuery } from '@mui/material'
import { Title } from 'components/Title'
import { truncate } from 'lodash'
import {
	Create,
	Datagrid,
	Edit,
	List,
	Show,
	SimpleForm,
	SimpleList,
	useRecordContext,
} from 'react-admin'
import { CreateActions, EditActions, ListActions, ShowActions } from './actions'
import { ResourceCounter } from './ResourceCounter'

export const CreateForm = ({ children, ...props }) => (
	<Create
		actions={<CreateActions />}
		redirect="show"
		sx={{ '& .RaCreate-main': (theme) => theme.mixins.mainArea }}
		{...props}
	>
		<SimpleForm>{children}</SimpleForm>
	</Create>
)

export const EditForm = ({ children, ...props }) => (
	<Edit
		actions={<EditActions />}
		redirect="show"
		sx={{ '& .RaEdit-main': (theme) => theme.mixins.mainArea }}
		{...props}
	>
		<SimpleForm>{children}</SimpleForm>
	</Edit>
)

const DescriptionExpand = () => {
	const record = useRecordContext()
	if (!record.description) {
		return null
	}
	return <Typography sx={{ px: 2, py: 1 }}>{record.description}</Typography>
}

const defaultDatagridProps = {
	rowClick: 'show',
	expand: <DescriptionExpand />,
}

export const ListForm = ({
	children,
	filters,
	datagridProps = defaultDatagridProps,
	...props
}) => {
	const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'))

	return (
		<List
			actions={<ListActions filters={filters} />}
			filters={filters}
			sort={{ field: 'createdAt', order: 'desc' }}
			perPage={25}
			empty={false}
			sx={{
				'& .RaChipField-chip': {
					margin: 0,
				},
			}}
			{...props}
		>
			<>
				<Title />
				<ResourceCounter />
				{isSmall ? (
					<SimpleList
						primaryText={(record) => record.title}
						secondaryText={(record) => {
							return truncate(record.description, { length: 200 })
						}}
						tertiaryText={(record) => record.publication.year}
					/>
				) : (
					<Datagrid
						isRowExpandable={(row) => row.description}
						expandSingle
						optimized
						{...datagridProps}
					>
						{children}
					</Datagrid>
				)}
			</>
		</List>
	)
}

export const ShowForm = ({ children, ...props }) => (
	<Show
		actions={<ShowActions />}
		sx={(theme) => ({
			'& .RaShow-main': {
				...theme.mixins.mainArea,
			},
			'& .RaLabeled-label': {
				color: theme.palette.primary.main,
				fontSize: '0.95rem !important',
			},
		})}
		{...props}
	>
		{/* <SimpleShowLayout spacing={3}>{children}</SimpleShowLayout> */}
		{children}
	</Show>
)
