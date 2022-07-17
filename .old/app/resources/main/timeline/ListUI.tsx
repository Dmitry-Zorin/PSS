import type { Theme } from '@mui/material'
import { Typography, useMediaQuery } from '@mui/material'
import { truncate } from 'lodash'
import type { DatagridProps } from 'react-admin'
import { Datagrid, SimpleList, WithRecord } from 'react-admin'

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
		<Datagrid
			rowClick="show"
			isRowExpandable={(record) => record.description}
			expand={
				<WithRecord
					render={(record) => (
						<Typography sx={{ px: 2, py: 1 }}>{record.description}</Typography>
					)}
				/>
			}
			expandSingle
			optimized
			{...props}
		/>
	)
}

export default ListUI
