import React from 'react'
import {
	ArrayField,
	ChipField,
	Datagrid,
	DateField,
	Filter,
	List, NumberInput,
	ReferenceArrayField, ReferenceField,
	ReferenceInput,
	SelectInput,
	SingleFieldList, TextField,
	TextInput
} from 'react-admin'
import { DateInput } from 'react-admin-date-inputs2'
import { DescriptionField, HeadlineField } from '../../CustomFields'
import { createEmptyPage, getBulkActionButtons } from '../../utils'
import {AbstractShow} from "./AbstractShow"

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

const Empty = createEmptyPage(
	'Нет доступных авторефератов',
	'Для добавления автореферата нажмите кнопку "Создать"'
)
const BulkActionButtons = getBulkActionButtons()

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
			label="Место публикации"
			source="publicationPlace"
			reference="publications"
		>
			<SelectInput optionText="name" />
		</ReferenceInput>
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
			options={{ format: dateFormat, cancelLabel: cancelLabel }}
		/>
		<DateInput
			label="Дата до"
			source="dateTo"
			options={{ format: dateFormat, cancelLabel: cancelLabel }}
		/>
		<TextInput
			label="Выходные данные"
			source="exitData"
		/>
	</Filter>
)

export const AbstractList = ({ permissions, ...props }) => (
	<List
		title="Список авторефератов"
		filters={<Filters />}
		perPage={25}
		exporter={false}
		sort={{ field: 'firstCreationDate', order: 'DESC' }}
		empty={<Empty />}
		bulkActionButtons={<BulkActionButtons permissions={permissions} />}
		{...props}>
		<Datagrid
			// rowClick={permissions ? "edit" : "show"}
			rowClick="show"
			expand={<AbstractShow enableActions={false} />}
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
			<ReferenceField
				label="Место публикации"
				source="publicationPlace"
				reference="publications"
				link=""
			>
				<TextField source="name" />
			</ReferenceField>
			<ReferenceArrayField label="Подразделения" reference="subdivisions" source="subdivisions">
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
