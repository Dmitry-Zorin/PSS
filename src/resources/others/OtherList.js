import React from 'react'
import { ArrayField, ChipField, Datagrid, Filter, List, SingleFieldList, TextField, TextInput } from 'react-admin'
import { DescriptionField, HeadlineField } from '../../CustomFields'
import { createEmptyPage, BulkActionButtons } from '../../raComponents.js'
import { OtherShow } from './OtherShow'

const Empty = createEmptyPage(
	'Нет доступных научных трудов',
	'Для добавления научного труда нажмите кнопку "Создать"',
)

const Filters = (props) => (
	<Filter {...props}>
		<TextInput
			label='Поиск по названию'
			source='headline'
			alwaysOn
		/>
		<TextInput
			label='Описание'
			source='text'
		/>
		<TextInput
			label='Автор'
			source='authors'
		/>
		
		<TextInput
			label='Выходные данные'
			source='exitData'
		/>
	</Filter>
)

export const OtherList = ({ permissions, ...props }) => (
	<List
		title='Список научных трудов'
		filters={<Filters/>}
		perPage={25}
		exporter={false}
		sort={{ field: 'firstCreationDate', order: 'DESC' }}
		empty={<Empty/>}
		bulkActionButtons={<BulkActionButtons permissions={permissions}/>}
		{...props}
	>
		<Datagrid
			rowClick='show'
			expand={<OtherShow enableActions={false}/>}
		>
			<TextField
				label='Тип работы'
				source='type'
			/>
			<HeadlineField
				label='Название'
				source='headline'
			/>
			<DescriptionField
				label='Описание'
				source='text'
				maxchars={250}
			/>
			<ArrayField
				source='authors'
				label='Авторы'
			>
				<SingleFieldList linkType={false}>
					<ChipField
						label='Автор'
						source='author'
					/>
				</SingleFieldList>
			</ArrayField>
			<TextField
				label='Год создания'
				source='creationDate'
			/>
		</Datagrid>
	</List>
)
