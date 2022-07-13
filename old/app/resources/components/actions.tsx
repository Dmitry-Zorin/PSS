import { Box, Breadcrumbs, Toolbar, Typography } from '@mui/material'
import {
	CreateButton,
	EditButton,
	FilterButton,
	ListButton,
	useRecordContext,
	useTranslate,
} from 'react-admin'
import { Admin } from '~/components'

const ActionBreadcrumbs = ({ action }: { action: 'create' | 'edit' }) => {
	const translate = useTranslate()
	const record = useRecordContext()

	return (
		<Toolbar>
			<Breadcrumbs sx={{ flexGrow: 1 }}>
				<Typography color="text.secondary">
					{translate(`resources.${record?.resource}.name`, { smart_count: 1 })}
				</Typography>
				<Typography color="text.primary">
					{translate(`ra.action.${action}`)}
				</Typography>
			</Breadcrumbs>
		</Toolbar>
	)
}

export const CreateActions = () => <ActionBreadcrumbs action="create" />

export const EditActions = () => (
	<>
		<ActionBreadcrumbs action="edit" />
		<Toolbar>
			<ListButton />
			<Box flexGrow={1} />
		</Toolbar>
	</>
)

export const ListActions = () => (
	<Toolbar>
		<FilterButton />
		<Admin>
			<CreateButton />
		</Admin>
	</Toolbar>
)

export const ShowActions = () => (
	<Toolbar>
		<ListButton />
		<Box flexGrow={1} />
		<Admin>
			<EditButton />
		</Admin>
	</Toolbar>
)
