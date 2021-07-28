import React from 'react'
import { Datagrid, Filter, List, TextField, TextInput } from 'react-admin'
import { BulkActionButtons, createEmptyPage } from '../../raComponents.js'

const Empty = createEmptyPage(
	'Нет доступных взводов',
	'Для добавления взвода нажмите кнопку "Создать"',
)

export const PlatoonList = ({ permissions, ...props }) => (
	<List
		title='Взвода'
		filters={<Filters/>}
		perPage={25}
		exporter={false}
		sort={{ field: 'firstCreationDate', order: 'DESC' }}
		empty={<Empty/>}
		bulkActionButtons={<BulkActionButtons permissions={permissions}/>}
		{...props}
	>
		<Datagrid rowClick='show'>
			<TextField
				label='Название'
				source='name'
			/>
			<TextField
				label='Направление'
				source='specialty'
			/>
			<TextField
				label='Командир взвода'
				source='platoonCommander'
			/>
		</Datagrid>
	</List>
)

const Filters = (props) => (
	<Filter {...props}>
		<TextInput
			label='Название'
			source='name'
			alwaysOn
		/>
		<TextInput
			label='Направление'
			source='specialty'
		/>
		<TextField
			label='Командир взвода'
			source='platoonCommander'
		/>
	</Filter>
)
