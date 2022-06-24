import { Title } from 'components'
import MainArea from 'components/MainArea'
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

export const Create = ({
	children,
	...props
}: ComponentProps<typeof RaCreate>) => (
	<RaCreate actions={<CreateActions />} redirect="show" {...props}>
		<MainArea>{children}</MainArea>
	</RaCreate>
)

export const Edit = ({ children, ...props }: ComponentProps<typeof RaEdit>) => (
	<RaEdit actions={<EditActions />} redirect="show" {...props}>
		<MainArea>{children}</MainArea>
	</RaEdit>
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

export const Show = ({ children, ...props }: ShowProps) => (
	<RaShow disableAuthentication actions={<ShowActions />} {...props}>
		<MainArea
			sx={(theme) => ({
				'& .RaLabeled-label': {
					color: theme.palette.primary.main,
					fontSize: '0.95rem !important',
				},
			})}
		>
			{children}
		</MainArea>
	</RaShow>
)
