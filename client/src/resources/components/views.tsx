import { Box } from '@mui/material'
import { Title } from 'components'
import { ComponentProps } from 'react'
import {
	Create as RaCreate,
	Edit as RaEdit,
	List as RaList,
	ListProps,
	Show as RaShow,
	ShowProps,
} from 'react-admin'
import { CreateActions, EditActions, ListActions, ShowActions } from './actions'
import ResourceCounter from './ResourceCounter'

export const Create = (props: ComponentProps<typeof RaCreate>) => (
	<Box sx={{ '& .RaCreate-main': ({ mixins }) => mixins.mainArea }}>
		<RaCreate actions={<CreateActions />} redirect="show" {...props} />
	</Box>
)

export const Edit = (props: ComponentProps<typeof RaEdit>) => (
	<Box sx={{ '& .RaEdit-main': ({ mixins }) => mixins.mainArea }}>
		<RaEdit actions={<EditActions />} redirect="show" {...props} />
	</Box>
)

export const List = ({ children, ...props }: ListProps) => (
	<RaList
		disableAuthentication
		actions={<ListActions />}
		sort={{ field: 'createdAt', order: 'desc' }}
		perPage={25}
		empty={false}
		sx={{
			'& .RaChipField-chip': {
				margin: 0,
			},
		}}
		{...props}
	>
		<>
			<Title />
			<ResourceCounter />
			{children}
		</>
	</RaList>
)

export const Show = (props: ShowProps) => (
	<Box
		sx={(theme) => ({
			'& .RaShow-main': {
				...theme.mixins.mainArea,
			},
			'& .RaLabeled-label': {
				color: theme.palette.primary.main,
				fontSize: '0.95rem !important',
			},
		})}
	>
		<RaShow disableAuthentication actions={<ShowActions />} {...props} />
	</Box>
)
