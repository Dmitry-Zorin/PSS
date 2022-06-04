import { Datagrid, List, usePermissions, useRecordContext } from 'react-admin'
import { ListActions } from './actions'
import { ResourceCounter } from './ResourceCounter'
import { Title } from './Title'

const DatagridExpand = () => {
	const record = useRecordContext()
	return <div>{record?.description || 'No description //'}</div>
}

const defaultDatagridProps = {
	rowClick: 'show',
	expand: <DatagridExpand />,
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
			perPage={25}
			empty={false}
			{...props}
		>
			<>
				<ResourceCounter />
				<Datagrid {...datagridProps}>{children}</Datagrid>
			</>
		</List>
	)
}
