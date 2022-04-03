import { Box, Typography } from '@mui/material'
import React from 'react'
import { BulkDeleteButton, CloneButton, CreateButton, EditButton, FilterButton, ListButton, RefreshButton, ShowButton, TopToolbar } from 'react-admin'

export const createTitle = (title, recordName) => (
	({ record }) => (
		<span>
			{title}: {record[recordName]}
		</span>
	)
)

export const createEmptyPage = (noPlacesMessage, addDataMessage) => (
	({ basePath }) => (
		<Box textAlign='center' m={1}>
			<Typography variant='h4' paragraph>
				No products available
			</Typography>
			<Typography variant='body1'>
				Create one or import from a file
			</Typography>
			<CreateButton/>
		</Box>
	)
)

export const ListActions = ({ filters, permissions }) => (
	<TopToolbar>
		<FilterButton filters={filters}/>
		{permissions && (
			<CreateButton/>
		)}
	</TopToolbar>
)

export const ShowActions = ({ permissions }) => (
	<TopToolbar>
		<ListButton/>
		{permissions && (
			<EditButton/>
		)}
		<RefreshButton/>
	</TopToolbar>
)

export const EditActions = ({ basePath, data: record }) => (
	<TopToolbar>
		<ListButton {...{ basePath, record }}/>
		<CreateButton {...{ basePath, record }}/>
		<CloneButton {...{ basePath, record }}/>
		<ShowButton {...{ basePath, record }}/>
		<RefreshButton {...{ basePath, record }}/>
	</TopToolbar>
)

export const EditActionsWithoutFile = ({ basePath, data: record }) => {
	const dataWithoutFile = { ...record }
	delete dataWithoutFile.file

	return (
		<TopToolbar>
			<ListButton {...{ basePath, record }}/>
			<CreateButton {...{ basePath, record }}/>
			<CloneButton record={dataWithoutFile} {...{ basePath }}/>
			<ShowButton {...{ basePath, record }}/>
			<RefreshButton {...{ basePath, record }}/>
		</TopToolbar>
	)
}

export const BulkActionButtons = ({ permissions }) => (
	!permissions ? null : (
		<>
			<BulkDeleteButton/>
		</>
	)
)
