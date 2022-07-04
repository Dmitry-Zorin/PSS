import { MainArea, Title } from 'components'
import { ComponentProps } from 'react'
import {
	CreateBase,
	EditBase,
	ListBase,
	ListToolbar,
	ListToolbarProps,
	ShowBase,
	TextField,
} from 'react-admin'
import { CreateActions, EditActions, ListActions, ShowActions } from './actions'
import ResourceCounter from './ResourceCounter'

export const Create = ({
	children,
	...props
}: ComponentProps<typeof CreateBase>) => (
	<CreateBase redirect="show" {...props}>
		<CreateActions />
		<MainArea>{children}</MainArea>
	</CreateBase>
)

export const Edit = ({
	children,
	...props
}: ComponentProps<typeof EditBase>) => (
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
}: ComponentProps<typeof ListBase> & ListToolbarProps) => (
	<ListBase
		sort={{ field: 'createdAt', order: 'desc' }}
		perPage={25}
		disableAuthentication
		{...props}
	>
		<>
			<Title />
			<ResourceCounter />
			<ListToolbar filters={filters} actions={actions} />
			{children}
		</>
	</ListBase>
)

export const Show = ({
	children,
	...props
}: ComponentProps<typeof ShowBase>) => (
	<ShowBase disableAuthentication {...props}>
		<>
			<ShowActions />
			<MainArea
				title={
					<TextField
						component="h1"
						variant="h3"
						source="title"
						sx={{
							fontSize: {
								xs: '2.2rem',
								sm: '2.4rem',
								md: '2.6rem',
								lg: '2.8rem',
							},
						}}
					/>
				}
				sx={{
					'.RaLabeled-label': {
						fontSize: '0.95rem !important',
					},
				}}
			>
				{children}
			</MainArea>
		</>
	</ShowBase>
)
