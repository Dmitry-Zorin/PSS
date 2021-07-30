import { Box, Typography } from '@material-ui/core'
import React from 'react'
import {
	BulkDeleteButton,
	CloneButton,
	CreateButton,
	EditButton,
	ListButton,
	RefreshButton,
	ShowButton,
	TopToolbar,
} from 'react-admin'

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
				{noPlacesMessage}
			</Typography>
			<Typography variant='body1'>
				{addDataMessage}
			</Typography>
			<CreateButton {...{ basePath }}/>
		</Box>
	)
)

export const ShowActions = ({ permissions, basePath, data: record }) => (
	<TopToolbar>
		<ListButton {...{ basePath, record }}/>
		{permissions && (
			<EditButton {...{ basePath, record }}/>
		)}
		<RefreshButton {...{ basePath, record }}/>
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

export const BulkActionButtons = ({ permissions, ...props }) => (
	permissions ? null : (
		<React.Fragment>
			<BulkDeleteButton {...props}/>
		</React.Fragment>
	)
)
