import React from 'react'
import { Datagrid, Filter, List, NumberInput, TextField, TextInput } from 'react-admin'
import { ChipArrayField } from '../../components/fields'
import { BulkActionButtons, createEmptyPage } from '../../components/old'
import { HeadlineField } from '../../CustomFields'

const Empty = createEmptyPage(
	'Нет доступных статей',
	'Для добавления статьи нажмите кнопку "Создать"',
)

const Filters = (props) => (
	<Filter {...props}>
		<TextInput
			label='Поиск по названию'
			source='headline'
			alwaysOn
		/>
		<TextInput
			label='Аннотация'
			source='abstract'
		/>
		<TextInput
			label='Автор'
			source='authors.author'
		/>
		<NumberInput
			label='Год создания'
			source='creationDate'
		/>
		<TextInput
			label='Выходные данные'
			source='exitData'
		/>
	</Filter>
)

const ArticleList = ({ permissions, ...props }) => (
	<List
		title='Список статей'
		filters={<Filters/>}
		perPage={25}
		exporter={false}
		sort={{ field: 'createdAt', order: '-1' }}
		empty={<Empty/>}
		bulkActionButtons={<BulkActionButtons permissions={permissions}/>}
		{...props}
	>
		<Datagrid
			rowClick='show'
			expand={({ record }) => (
				<div>{record.description || 'No description'}</div>
			)}
		>
			<HeadlineField source='title'/>
			<ChipArrayField label='Авторы' source='authors'/>
			<TextField label='Год создания' source='creationDate'/>
		</Datagrid>
	</List>
)

export default ArticleList
