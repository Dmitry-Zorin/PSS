import { Theme, useMediaQuery } from '@mui/material'
import { truncate } from 'lodash'
import { Datagrid, DatagridProps, SimpleList } from 'react-admin'

const ListUI = (props: DatagridProps) => {
	const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	return isSmall ? (
		<SimpleList
			linkType="show"
			primaryText={(record) => record.title}
			secondaryText={(record) => {
				return truncate(record.description, { length: 200 })
			}}
			tertiaryText={(record) => record.publication.year}
		/>
	) : (
		<Datagrid rowClick="show" optimized {...props} />
	)
}

export default ListUI
