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
			source='title'
			label='fields.search'
			alwaysOn
		/>
		<TextInput
			source='description'
			label='fields.description'
		/>
		<TextInput
			source='authors.author'
			label='fields.author'
		/>
		<NumberInput
			source='creationDate'
			label='fields.year'
		/>
		<TextInput
			source='exitData'
			label='fields.exitData'
		/>
	</Filter>
)

const ArticleList = ({ permissions, ...props }) => (
	<List
		title='resources.articles.titles.list'
		filters={<Filters/>}
		perPage={25}
		exporter={false}
		sort={{ field: 'createdAt', order: '-1' }}
		empty={<Empty/>}
		{...props}
	>
		<Datagrid
			rowClick='show'
			bulkActionButtons={<BulkActionButtons permissions={permissions}/>}
			expand={({ record }) => (
				<div>{record.description || 'No description //'}</div>
			)}
		>
			<HeadlineField source='title' label='fields.title'/>
			<ChipArrayField source='authors' label='fields.authors'/>
			<TextField source='creationDate' label='fields.year'/>
		</Datagrid>
	</List>
)

export default ArticleList
