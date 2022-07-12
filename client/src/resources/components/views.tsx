import { ListProps } from '@mui/material'
import { MainArea, Title } from 'components'
import { ReactNode } from 'react'
import {
	CreateBase,
	CreateProps,
	EditBase,
	EditProps,
	ListBase,
	ListToolbar,
	ListToolbarProps,
	Pagination,
	ShowBase,
	ShowProps,
	TextField,
	useRecordContext,
} from 'react-admin'
import { CreateActions, EditActions, ListActions, ShowActions } from './actions'
import ResourceCounter from './ResourceCounter'

export const Create = ({
	children,
	...props
}: { children: ReactNode } & CreateProps) => (
	<CreateBase redirect="show" {...props}>
		<CreateActions />
		<MainArea>{children}</MainArea>
	</CreateBase>
)

export const Edit = ({
	children,
	...props
}: { children: ReactNode } & EditProps) => (
	<EditBase redirect="show" {...props}>
		<EditActions />
		<MainArea>{children}</MainArea>
	</EditBase>
)

export const List = ({
	children,
	filters,
	actions = <ListActions />,
	...props
}: { children: ReactNode } & ListProps &
	Pick<ListToolbarProps, 'filters' | 'actions'>) => (
	<ListBase
		sort={{ field: 'createdAt', order: 'desc' }}
		disableAuthentication
		{...props}
	>
		<>
			<Title />
			<ResourceCounter />
			<ListToolbar filters={filters} actions={actions} />
			{children}
			<Pagination />
		</>
	</ListBase>
)

const ShowContaner = ({ children }: { children: ReactNode }) => {
	if (!useRecordContext()) {
		return null
	}
	return (
		<MainArea title={<TextField source="title" component="h1" variant="h3" />}>
			{children}
		</MainArea>
	)
}

export const Show = ({
	children,
	...props
}: { children: ReactNode } & ShowProps) => (
	<ShowBase disableAuthentication {...props}>
		<>
			<ShowActions />
			<ShowContaner>{children}</ShowContaner>
		</>
	</ShowBase>
)
