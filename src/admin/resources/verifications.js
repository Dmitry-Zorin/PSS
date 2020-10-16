import React from 'react'

import {
	ArrayField,
	ArrayInput,
	ChipField,
	Create,
	Datagrid,
	DateField,
	Edit,
	FileField,
	FileInput,
	Filter,
	List,
	minLength,
	required,
	Show,
	SimpleForm,
	SimpleFormIterator,
	SimpleShowLayout,
	SingleFieldList,
	TextField,
	TextInput
} from 'react-admin'
import { DateInput } from 'react-admin-date-inputs2'

import { DescriptionField, HeadlineField } from '../CustomFields'

import { createEmptyPage, createTitle, getBulkActionButtons, getEditActionsWithoutFile, getShowActions } from '../utils'

const validateHeadline = [required(), minLength(1),]
const validateDescription = [required(), minLength(1),]
const validateCreationDate = [required(),]
const validateAuthors = [required(),]
const validateFile = [required(),]

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

const Title = createTitle('Испытание', 'headline')
const Empty = createEmptyPage('Нет доступных испытаний',
	'Для добавления испытания нажмите кнопку "Создать"')
const ShowActions = getShowActions()
const EditActions = getEditActionsWithoutFile()
const BulkActionButtons = getBulkActionButtons()

const Filters = (props) => (
	<Filter {...props}>
		<TextInput
			label="Поиск по названию"
			source="headline"
			alwaysOn/>
		<TextInput
			label="Описание"
			source="description"/>
		<TextInput
			label="Головной исполнитель"
			source="headPerformer"/>
		<TextInput
			label="Заказчик"
			source="customer"/>
		<TextInput
			label="Cоисполнитель"
			source="authors"/>
		<DateInput
			label="Дата от"
			source="dateFrom"
			options={{ format: dateFormat, cancelLabel: cancelLabel }}/>
		<DateInput
			label="Дата до"
			source="dateTo"
			options={{ format: dateFormat, cancelLabel: cancelLabel }}/>
	</Filter>
)

export const ListForm = ({ permissions, ...props }) => (
	<List
		title="Список испытаний"
		filters={<Filters/>}
		perPage={25}
		exporter={false}
		sort={{ field: 'firstCreationDate', order: 'DESC' }}
		empty={<Empty/>}
		bulkActionButtons={<BulkActionButtons permissions={permissions}/>}
		{...props}>
		<Datagrid
			rowClick="show"
			expand={<ShowForm enableActions={false}/>}>
			<HeadlineField
				label="Название"
				source="headline"/>
			<DescriptionField
				label="Описание"
				source="description"
				maxchars={250}/>
			<TextField
				label="Головной исполнитель"
				source="headPerformer"/>
			<TextField
				label="Заказчик"
				source="customer"/>
			<ArrayField
				source="authors"
				label="Соисполнители">
				<SingleFieldList linkType={false}>
					<ChipField
						label="Соисполнитель"
						source="author"/>
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

export const CreateForm = props => (
	<Create
		title="Добавить испытание"
		successMessage="Испытание добавлено"
		undoable={false}
		{...props}>
		<SimpleForm
			redirect="list"
			submitOnEnter={false}>
			<TextInput
				fullWidth
				label="Название"
				source="headline"
				validate={validateHeadline}/>
			<TextInput
				fullWidth
				label="Описание"
				multiline
				source="description"
				validate={validateDescription}/>
			<TextInput
				label="Головной исполнитель"
				source="headPerformer"/>
			<TextInput
				label="Заказчик"
				source="customer"/>
			<ArrayInput
				validate={validateAuthors}
				source="authors"
				label="Соискатели">
				<SimpleFormIterator>
					<TextInput
						label="Соискатель"
						source="author"/>
				</SimpleFormIterator>
			</ArrayInput>
			<DateInput
				label="Дата создания"
				source="creationDate"
				validate={validateCreationDate}
				options={{ format: dateFormat, cancelLabel: cancelLabel }}/>
			<FileInput
				source="file"
				label="Архив"
				accept="application/x-rar-compressed, application/zip"
				validate={validateFile}>
				<FileField
					source="file"
					title="Загруженный файл"/>
			</FileInput>
		</SimpleForm>
	</Create>
)

export const EditForm = props => (
	<Edit
		title={<Title/>}
		successMessage="Испытание обновлено"
		undoable={false}
		actions={<EditActions/>}
		{...props}>
		<SimpleForm
			submitOnEnter={false}>
			<TextInput
				fullWidth
				label="Название"
				source="headline"
				validate={validateHeadline}/>
			<TextInput
				fullWidth
				label="Описание"
				multiline
				source="description"
				validate={validateDescription}/>
			<TextInput
				label="Головной исполнитель"
				source="headPerformer"/>
			<TextInput
				label="Заказчик"
				source="customer"/>
			<ArrayInput
				validate={validateAuthors}
				label="Соискатели"
				source="authors">
				<SimpleFormIterator>
					<TextInput
						label="Соискатель"
						source="author"/>
				</SimpleFormIterator>
			</ArrayInput>
			<DateInput
				label="Дата создания"
				source="creationDate"
				validate={validateCreationDate}
				options={{ format: dateFormat, cancelLabel: cancelLabel }}/>
			<FileField
				source="file.url"
				title="file.title"
				label="Архив"
				target="_blank"/>
			<FileInput
				source="newfile"
				label="Новый файл"
				accept="application/x-rar-compressed, application/zip">
				<FileField
					source="src"
					title="Загруженный файл"/>
			</FileInput>
		</SimpleForm>
	</Edit>
)

export const ShowForm = ({ permissions, enableActions, ...props }) => {
	const actions = enableActions ? <ShowActions permissions={permissions}/> : false
	return (
		<Show
			title={<Title/>}
			actions={actions}
			{...props}>
			<SimpleShowLayout>
				<TextField
					label="Название"
					source="headline"/>
				<TextField
					label="Описание"
					source="description"/>
				<TextField
					label="Головной исполнитель"
					source="headPerformer"/>
				<TextField
					label="Заказчик"
					source="customer"/>
				<ArrayField
					label="Соискатели"
					source="authors">
					<SingleFieldList linkType={false}>
						<ChipField
							label="Соискатель"
							source="author"/>
					</SingleFieldList>
				</ArrayField>
				<TextField
					label="Категория"
					source="category"/>
				<DateField
					label="Дата создания"
					source="creationDate"
					locales="ru-RU"/>
				<FileField
					source="file.url"
					title="file.title"
					label="Архив"
					target="_blank"/>
			</SimpleShowLayout>
		</Show>
	)
}

ShowForm.defaultProps = {
	enableActions: true,
}