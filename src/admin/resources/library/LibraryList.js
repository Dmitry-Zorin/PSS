import React from 'react'
import {
	ArrayField,
	ChipField,
	Datagrid,
	DateField,
	Filter,
	List,
	ReferenceArrayField,
	ReferenceInput,
	SelectInput,
	SingleFieldList,
	TextInput
} from 'react-admin'
import { DateInput } from 'react-admin-date-inputs2'
import { DescriptionField, HeadlineField } from '../../CustomFields'
import { createEmptyPage, getBulkActionButtons } from '../../utils'
import { Aside } from './Aside'
import { LibraryShow } from './LibraryShow'

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

const Empty = createEmptyPage(
	'Нет доступных книг',
	'Для добавления книги нажмите кнопку "Создать"'
)
const BulkActionButtons = getBulkActionButtons()

export const LibraryList = ({ permissions, ...props }) => (
	<List
		title="Список книг"
		filters={<Filters />}
		perPage={25}
		exporter={false}
		sort={{ field: 'firstCreationDate', order: 'DESC' }}
		empty={<Empty />}
		aside={<Aside />}
		bulkActionButtons={<BulkActionButtons permissions={permissions} />}
		{...props}
	>
		<Datagrid
			rowClick="show"
			expand={<LibraryShow enableActions={false} />}
		>
			<HeadlineField
				label="Название"
				source="headline"
			/>
			<DescriptionField
				label="Аннотация"
				source="text"
				maxchars={250}
			/>
			<ReferenceArrayField
				label="Подразделения"
				reference="subdivisions"
				source="subdivisions"
			>
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceArrayField>
			<ArrayField
				source="authors"
				label="Авторы"
			>
				<SingleFieldList linkType={false}>
					<ChipField
						label="Автор"
						source="author"
					/>
				</SingleFieldList>
			</ArrayField>
			<DateField
				label="Дата создания"
				source="creationDate"
				locales="ru-RU"
			/>
		</Datagrid>
	</List>
)

const Filters = (props) => (
	<Filter {...props}>
		<TextInput
			label="Поиск по названию"
			source="headline"
			alwaysOn
		/>
		<TextInput
			label="Аннотация"
			source="text"
		/>
		<TextInput
			label="Автор"
			source="authors"
		/>
		<ReferenceInput
			perPage={1000}
			label="Подразделение"
			source="subdivisions"
			reference="subdivisions"
		>
			<SelectInput optionText="name" />
		</ReferenceInput>
		<DateInput
			label="Дата от"
			source="dateFrom"
			options={{
				format: dateFormat,
				cancelLabel: cancelLabel
			}}
		/>
		<DateInput
			label="Дата до"
			source="dateTo"
			options={{
				format: dateFormat,
				cancelLabel: cancelLabel
			}}
		/>
	</Filter>
)
