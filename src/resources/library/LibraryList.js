import React from 'react'
import {
	ArrayField,
	ChipField,
	Datagrid,
	Filter,
	List,
	ReferenceInput,
	SelectInput,
	SingleFieldList,
	TextInput,
} from 'react-admin'
import { HeadlineField } from '../../CustomFields'
import { createEmptyPage, BulkActionButtons } from '../../raComponents.js'
import { Aside } from './Aside'
import { LibraryShow } from './LibraryShow'

const Empty = createEmptyPage(
	'Нет доступных книг',
	'Для добавления книги нажмите кнопку "Создать"',
)

export const LibraryList = ({ permissions, ...props }) => (
	<List
		title='Библиотека'
		filters={<Filters/>}
		perPage={25}
		exporter={false}
		sort={{ field: 'firstCreationDate', order: 'DESC' }}
		empty={<Empty/>}
		aside={<Aside/>}
		bulkActionButtons={<BulkActionButtons permissions={permissions}/>}
		{...props}
	>
		<Datagrid
			rowClick='show'
			expand={<LibraryShow enableActions={false}/>}
		>
			<HeadlineField
				label='Название'
				source='headline'
			/>
			<ArrayField
				label='Авторы'
				source='authors'
			>
				<SingleFieldList linkType={false}>
					<ChipField
						label='Автор'
						source='author'
					/>
				</SingleFieldList>
			</ArrayField>
			<ArrayField
				label='Ключевые слова'
				source='tags'
			>
				<SingleFieldList linkType={false}>
					<ChipField
						label='Ключевое слово'
						source='tag'
					/>
				</SingleFieldList>
			</ArrayField>
		</Datagrid>
	</List>
)

const Filters = (props) => (
	<Filter {...props}>
		<TextInput
			label='Название'
			source='headline'
			alwaysOn
		/>
		<TextInput
			label='Автор'
			source='authors'
			alwaysOn
		/>
		<TextInput
			label='Ключевое слово'
			source='tags'
			alwaysOn
		/>
		<TextInput
			label='Описание'
			source='text'
		/>
		<ReferenceInput
			perPage={1000}
			label='Подразделение'
			source='subdivisions'
			reference='subdivisions'
		>
			<SelectInput optionText='name'/>
		</ReferenceInput>
	</Filter>
)
