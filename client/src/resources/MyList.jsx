import React, { useEffect } from 'react'
import { Datagrid, List, useListContext, usePermissions, useRecordContext, useResourceContext, useStore } from 'react-admin'
import { ListActions } from '../components/old'

const ResourceCounter = () => {
	const { data } = useListContext()
	const resource = useResourceContext()
	const [resourcesCount, setResourcesCount] = useStore('resources.count')

	useEffect(() => {
		if (data && resourcesCount[resource] !== data.length) {
			setResourcesCount({
				...resourcesCount,
				[resource]: data.length,
			})
		}
	}, [])

	return null
}

const DatagridExpand = () => {
	const record = useRecordContext()
	return (
		<div>
			{record?.description || 'No description //'}
		</div>
	)
}

const MyList = ({ children, filters }) => {
	const { permissions } = usePermissions()
	const resource = useResourceContext()

	return (
		<List
			title={`resources.${resource}.titles.list`}
			actions={<ListActions {...{ filters, permissions }}/>}
			filters={filters}
			sort={{ field: 'createdAt', order: 'desc' }}
			perPage={25}
		>
			<>
				<ResourceCounter/>
				<Datagrid rowClick='show' expand={<DatagridExpand/>}>
					{children}
				</Datagrid>
			</>
		</List>
	)
}

export default MyList
