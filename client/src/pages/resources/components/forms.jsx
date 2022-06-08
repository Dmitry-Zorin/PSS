import { Typography } from '@mui/material'
import {
	Create,
	Datagrid,
	Edit,
	List,
	Show,
	SimpleForm,
	usePermissions,
	useRecordContext,
} from 'react-admin'
import { ListActions, ShowActions } from './actions'
import { ResourceCounter } from './ResourceCounter'
import { Title } from './Title'

export const CreateForm = ({ children, ...props }) => (
	<Create title={<Title action="create" />} redirect="show" {...props}>
		<SimpleForm>{children}</SimpleForm>
	</Create>
)

export const EditForm = ({ children, ...props }) => (
	<Edit title={<Title action="edit" />} {...props}>
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
	const { permissions } = usePermissions()

	return (
		<List
			title={<Title action="list" />}
			actions={<ListActions {...{ filters, permissions }} />}
			filters={filters}
			sort={{ field: 'createdAt', order: 'desc' }}
			perPage={10}
			empty={false}
			{...props}
		>
			<>
				<Datagrid {...datagridProps}>{children}</Datagrid>
				<ResourceCounter />
			</>
		</List>
	)
}

export const ShowForm = ({ children, ...props }) => {
	const permissions = usePermissions()

	return (
		<Show
			title={<Title action="show" />}
			actions={<ShowActions {...{ permissions }} />}
			{...props}
		>
			{/* <SimpleShowLayout spacing={3}>{children}</SimpleShowLayout> */}
			{children}
		</Show>
	)
}
