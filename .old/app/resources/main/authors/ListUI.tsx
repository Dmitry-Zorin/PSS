import type { Theme } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import type { DatagridProps } from 'react-admin'
import { Datagrid, SimpleList } from 'react-admin'

const ListUI = (props: DatagridProps) => {
	const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	return isSmall ? (
		<SimpleList
			linkType="show"
			primaryText={({ firstName, middleName, lastName }) =>
				`${lastName} ${firstName} ${middleName}`
			}
		/>
	) : (
		<Datagrid rowClick="show" optimized {...props} />
	)
}

export default ListUI
