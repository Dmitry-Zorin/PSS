import React from 'react'
import {
	ArrayField,
	ChipField,
	Datagrid,
	DateField,
	Filter,
	List,
	SingleFieldList,
	TextField,
	TextInput
} from 'react-admin'
import { DateInput } from 'react-admin-date-inputs2'
import { DescriptionField, HeadlineField } from '../../CustomFields'
import { createEmptyPage, getBulkActionButtons } from '../../utils'
import {OtherShow} from "./OtherShow"

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

const Empty = createEmptyPage(
	'Нет доступных научных трудов',
	'Для добавления научного труда нажмите кнопку "Создать"'
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
			label="Описание"
			source="text"
		/>
		<TextInput
			label="Автор"
			source="authors"
		/>
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

export const OtherList = ({ permissions, ...props }) => (
	<List
		title="Список статей"
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
			expand={<OtherShow enableActions={false} />}
		>
			<TextField
				label="Тип работы"
				source="type"
			/>
			<HeadlineField
				label="Название"
				source="headline"
			/>
			<DescriptionField
				label="Описание"
				source="text"
				maxchars={250}
			/>
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
