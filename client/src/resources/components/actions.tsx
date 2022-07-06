import { Toolbar } from '@mui/material'
import { Admin } from 'components'
import { CreateButton, EditButton, FilterButton, ListButton } from 'react-admin'

export const CreateActions = () => (
	<Toolbar>
		<ListButton sx={{ mr: 'auto' }} />
	</Toolbar>
)

export const EditActions = () => (
	<Toolbar>
		<ListButton sx={{ mr: 'auto' }} />
	</Toolbar>
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
		<ListButton sx={{ mr: 'auto' }} />
		<Admin>
			<EditButton />
		</Admin>
	</Toolbar>
)
