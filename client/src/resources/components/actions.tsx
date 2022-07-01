import { Box } from '@mui/material'
import { Admin } from 'components'
import {
	CreateButton,
	EditButton,
	FilterButton,
	ListButton,
	TopToolbar,
} from 'react-admin'

export const CreateActions = () => (
	<TopToolbar>
		<ListButton />
	</TopToolbar>
)

export const EditActions = () => (
	<TopToolbar>
		<ListButton />
	</TopToolbar>
)

export const ListActions = () => (
	<TopToolbar>
		<FilterButton />
		<Admin>
			<CreateButton />
		</Admin>
	</TopToolbar>
)

export const ShowActions = () => (
	<TopToolbar>
		<ListButton />
		<Box flex={1}></Box>
		<Admin>
			<EditButton />
		</Admin>
	</TopToolbar>
)
