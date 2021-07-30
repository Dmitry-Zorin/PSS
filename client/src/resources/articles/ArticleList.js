import React from 'react'
import {
	Datagrid,
	Filter,
	List,
	NumberInput,
	ReferenceInput,
	SelectInput,
	TextField,
	TextInput,
} from 'react-admin'
import { DescriptionField, HeadlineField } from '../../CustomFields.js'
import { createEmptyPage } from '../../raComponents.js'

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

export const ArticleList = ({ permissions, ...props }) => (
	<List
		title='Список статей'
		filters={<Filters/>}
		//perPage={25}
		//exporter={false}
		sort={{ field: 'createdAt', order: -1 }}
		empty={<Empty/>}
		//bulkActionButtons={<BulkActionButtons permissions={permissions}/>}
		{...props}
	>
		<Datagrid
			rowClick='show'
			expand={(
				<DescriptionField
					label='Аннотация'
					source='abstract'
				/>
			)}
		>
			<HeadlineField
				label='Название'
				source='headline'
			/>
			{/*<ArrayField
				source='authors'
				label='Авторы'
			>
				<SingleFieldList linkType={false}>
					<ChipField
						label='Автор'
						source='author'
					/>
				</SingleFieldList>
			</ArrayField>*/}
			<TextField
				label='Год создания'
				source='creationDate'
			/>
		</Datagrid>
	</List>
)
