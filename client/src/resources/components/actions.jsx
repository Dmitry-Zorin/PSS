import {
	CloneButton,
	CreateButton,
	EditButton,
	FilterButton,
	ListButton,
	ShowButton,
	TopToolbar,
	usePermissions,
} from 'react-admin'

export const CreateActions = () => (
	<TopToolbar>
		<ListButton />
	</TopToolbar>
)

export const EditActions = () => (
	<TopToolbar>
		<ListButton />
		<ShowButton />
	</TopToolbar>
)

export const ListActions = ({ filters }) => (
	<TopToolbar>
		{filters && <FilterButton filters={filters} />}
		{usePermissions().permissions?.isAdmin && <CreateButton />}
	</TopToolbar>
)

export const ShowActions = () => (
	<TopToolbar>
		<ListButton />
		{usePermissions().permissions?.isAdmin && (
			<>
				<EditButton />
				<CloneButton />
				<CreateButton />
			</>
		)}
	</TopToolbar>
)
