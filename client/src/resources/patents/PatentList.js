import React from 'react'
import {
	ArrayField,
	ChipField,
	Datagrid,
	Filter,
	List,
	ReferenceArrayField,
	ReferenceInput,
	SelectInput,
	SingleFieldList,
	TextField,
	TextInput,
} from 'react-admin'
import { DescriptionField, HeadlineField } from '../../CustomFields'
import { BulkActionButtons, createEmptyPage } from '../../components/inputs'
import { PatentShow } from './PatentShow'

const Empty = createEmptyPage(
	'Нет доступных патентов',
	'Для добавления патента нажмите кнопку "Создать"',
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
			source='description'
		/>
		<TextInput
			label='Автор'
			source='authors'
		/>
		<ReferenceInput
			perPage={1000}
			label='Подразделение'
			source='subdivisions'
			reference='subdivisions'
		>
			<SelectInput optionText='name'/>
		</ReferenceInput>
		<TextInput
			label='Код свидетельства'
			source='certificate.code'
		/>
	</Filter>
)

export const PatentList = ({ permissions, ...props }) => (
	<List
		title='Список патентов'
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
			expand={<PatentShow enableActions={false}/>}
		>
			<HeadlineField
				label='Название'
				source='headline'
			/>
			<DescriptionField
				label='Описание'
				source='description'
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
			<ReferenceArrayField
				label='Подразделения'
				reference='subdivisions'
				source='subdivisions'
			>
				<SingleFieldList>
					<ChipField source='name'/>
				</SingleFieldList>
			</ReferenceArrayField>
			<TextField
				label='Год создания'
				source='creationDate'
			/>
		</Datagrid>
	</List>
)
