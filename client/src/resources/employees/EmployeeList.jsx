import React from 'react'
import { Datagrid, Filter, List, TextField, TextInput } from 'react-admin'
import { BulkActionButtons, createEmptyPage } from '../components/inputs'

const Empty = createEmptyPage(
	'Нет доступных сотрудников',
	'Для добавления сотрудника нажмите кнопку "Создать"',
)

export const EmployeeList = ({ permissions, ...props }) => (
	<List
		title="Сотрудники"
		filters={<Filters />}
		perPage={25}
		exporter={false}
		sort={{ field: 'firstCreationDate', order: 'DESC' }}
		empty={<Empty />}
		bulkActionButtons={<BulkActionButtons permissions={permissions} />}
		{...props}
	>
		<Datagrid rowClick="show">
			<TextField label="ФИО" source="name" />
			<TextField label="Взвод" source="platoonNumber" />
			<TextField label="Рота" source="companyNumber" />
			<TextField label="Специальность" source="specialty" />
			<TextField label='Научная тема в ВИТ "ЭРА"' source="researchTopic" />
		</Datagrid>
	</List>
)

const Filters = (props) => (
	<Filter {...props}>
		<TextInput label="ФИО" source="name" alwaysOn />
		<TextInput label="Взвод" source="platoonNumber" />
		<TextInput label="Рота" source="companyNumber" />
		<TextInput label="Специальность" source="specialty" />
		<TextInput label='Научная тема в ВИТ "ЭРА"' source="researchTopic" />
	</Filter>
)
