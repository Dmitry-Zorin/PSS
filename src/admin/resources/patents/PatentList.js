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

import {
	createEmptyPage,
	createTitle,
	getBulkActionButtons,
	getEditActionsWithoutFile,
	getShowActions
} from '../../utils'
import { PatentShow } from './PatentShow'

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

const Empty = createEmptyPage(
	'Нет доступных патентов',
	'Для добавления патента нажмите кнопку "Создать"'
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
			source="description"
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
			options={{ format: dateFormat, cancelLabel: cancelLabel }}
		/>
		<DateInput
			label="Дата до"
			source="dateTo"
			options={{ format: dateFormat, cancelLabel: cancelLabel }}
		/>
		<TextInput
			label="Код свидетельства"
			source="certificate.code"
		/>
	</Filter>
)

export const PatentList = ({ permissions, ...props }) => (
	<List
		title="Список патентов"
		filters={<Filters />}
		perPage={25}
		exporter={false}
		sort={{ field: 'firstCreationDate', order: 'DESC' }}
		empty={<Empty />}
		bulkActionButtons={<BulkActionButtons permissions={permissions} />}
		{...props}
	>
		<Datagrid
			// rowClick={permissions ? "edit" : "show"}
			rowClick="show"
			expand={<PatentShow enableActions={false} />}
		>
			<HeadlineField
				label="Название"
				source="headline"
			/>
			<DescriptionField
				label="Описание"
				source="description"
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
			<ReferenceArrayField
				label="Подразделения"
				reference="subdivisions"
				source="subdivisions"
			>
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceArrayField>
			<DateField
				label="Дата создания"
				source="creationDate"
				locales="ru-RU"
			/>
		</Datagrid>
	</List>
)
