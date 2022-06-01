import {
	CloneButton,
	CreateButton,
	EditButton,
	FilterButton,
	ListButton,
	RefreshButton,
	ShowButton,
	TopToolbar,
} from 'react-admin'

export const ListActions = ({ filters, permissions }) => (
	<TopToolbar>
		{filters && <FilterButton filters={filters} />}
		{permissions && <CreateButton />}
	</TopToolbar>
)

export const ShowActions = ({ permissions }) => (
	<TopToolbar>
		<ListButton />
		{permissions && <EditButton />}
		<RefreshButton />
	</TopToolbar>
)

export const EditActions = ({ basePath, data: record }) => (
	<TopToolbar>
		<ListButton {...{ basePath, record }} />
		<CreateButton {...{ basePath, record }} />
		<CloneButton {...{ basePath, record }} />
		<ShowButton {...{ basePath, record }} />
		<RefreshButton {...{ basePath, record }} />
	</TopToolbar>
)
