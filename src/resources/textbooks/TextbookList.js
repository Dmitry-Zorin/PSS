import React from 'react'
import {
	ArrayField,
	ChipField,
	Datagrid,
	Filter,
	List,
	ReferenceArrayField,
	ReferenceField,
	ReferenceInput,
	SelectInput,
	SingleFieldList,
	TextField,
	TextInput,
} from 'react-admin'
import { DescriptionField, HeadlineField } from '../../CustomFields'
import { createEmptyPage, BulkActionButtons } from '../../raComponents.js'
import { TextbookShow } from './TextbookShow'

const Empty = createEmptyPage(
	'Нет доступных учебников',
	'Для добавления учебника нажмите кнопку "Создать"',
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
			source='text'
		/>
		<TextInput
			label='Автор'
			source='authors'
		/>
		<ReferenceInput
			label='Место публикации'
			source='publicationPlace'
			reference='publications'
		>
			<SelectInput optionText='name'/>
		</ReferenceInput>
		<ReferenceInput
			perPage={1000}
			label='Подразделение'
			source='subdivisions'
			reference='subdivisions'
		>
			<SelectInput optionText='name'/>
		</ReferenceInput>
		
		<TextInput
			label='Выходные данные'
			source='exitData'
		/>
	</Filter>
)

export const TextbookList = ({ permissions, ...props }) => (
	<List
		title='Список статей'
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
			expand={<TextbookShow enableActions={false}/>}
		>
			<HeadlineField
				label='Название'
				source='headline'
			/>
			<DescriptionField
				label='Аннотация'
				source='text'
				maxchars={250}
			/>
			<ReferenceField
				label='Место публикации'
				source='publicationPlace'
				reference='publications'
				link=''
			>
				<TextField source='name'/>
			</ReferenceField>
			<ReferenceArrayField
				label='Подразделения'
				reference='subdivisions'
				source='subdivisions'
			>
				<SingleFieldList>
					<ChipField source='name'/>
				</SingleFieldList>
			</ReferenceArrayField>
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
