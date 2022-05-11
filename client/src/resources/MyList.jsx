import React from 'react'
import { Datagrid, List, usePermissions, useRecordContext, useResourceContext } from 'react-admin'
import { ListActions } from './components/old'
import ResourceCounter from './ResourceCounter'

const DatagridExpand = () => {
	const record = useRecordContext()
	return (
		<div>
			{record?.description || 'No description //'}
		</div>
	)
}

const MyList = ({ children, filters, datagridProps, ...props }) => {
	const { permissions } = usePermissions()
	const resource = useResourceContext()

	const defaultDatagridProps = {
		rowClick: 'show',
		expand: <DatagridExpand/>,
	}

	return (
		<List
			title={`resources.${resource}.titles.list`}
			actions={<ListActions {...{ filters, permissions }}/>}
			filters={filters}
			sort={{ field: 'createdAt', order: 'desc' }}
			perPage={25}
			{...props}
		>
			<>
				<ResourceCounter/>
				<Datagrid {...datagridProps || defaultDatagridProps}>
					{children}
				</Datagrid>
			</>
		</List>
	)
}

export default MyList
