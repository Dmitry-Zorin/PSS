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
	ReferenceArrayField,
	ReferenceArrayInput,
	ReferenceInput,
	required,
	SelectArrayInput,
	SelectInput,
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
const validateAnnotation = [required(), minLength(1),]
const validateCreationDate = [required(),]
const validateAuthors = [required(),]
const validateFile = [required(),]

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

const Title = createTitle('Библиотека', 'headline')
const Empty = createEmptyPage(
	'Нет доступных книг',
	'Для добавления книги нажмите кнопку "Создать"'
)
const ShowActions = getShowActions()
const EditActions = getEditActionsWithoutFile()
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

export const ListForm = ({ permissions, ...props }) => (
	<List
		title="Список книг"
		filters={<Filters />}
		perPage={25}
		exporter={false}
		sort={{ field: 'firstCreationDate', order: 'DESC' }}
		empty={<Empty />}
		bulkActionButtons={<BulkActionButtons permissions={permissions} />}
		{...props}
	>
		<Datagrid
			rowClick="show"
			expand={<ShowForm enableActions={false} />}
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

export const CreateForm = (props) => (
	<Create
		title="Добавить книгу"
		successMessage="Книга добавлена"
		undoable={false}
		{...props}
	>
		<SimpleForm
			redirect="list"
			submitOnEnter={false}
		>
			<TextInput
				fullWidth
				label="Название"
				source="headline"
				validate={validateHeadline}
			/>
			<TextInput
				fullWidth
				label="Аннотация"
				multiline
				source="text"
				validate={validateAnnotation}
				options={{ multiLine: true }}
			/>
			<DateInput
				label="Дата создания"
				source="creationDate"
				validate={validateCreationDate}
				options={{
					format: dateFormat,
					cancelLabel: cancelLabel
				}}
			/>
			<ArrayInput
				validate={validateAuthors}
				source="authors"
				label="Авторы"
			>
				<SimpleFormIterator>
					<TextInput
						label="Автор"
						source="author"
					/>
				</SimpleFormIterator>
			</ArrayInput>
			<ReferenceArrayInput
				fullWidth
				label="Подразделения"
				reference="subdivisions"
				source="subdivisions"
				perPage={1000}
			>
				<SelectArrayInput optionText="name" />
			</ReferenceArrayInput>
			<FileInput
				source="file"
				label="PDF файл"
				accept="application/pdf"
				validate={validateFile}
			>
				<FileField
					source="file"
					title="Загруженный файл"
				/>
			</FileInput>
		</SimpleForm>
	</Create>
)

export const EditForm = (props) => (
	<Edit
		title={<Title />}
		successMessage="Книга обновлена"
		undoable={false}
		actions={<EditActions />}
		{...props}
	>
		<SimpleForm submitOnEnter={false}>
			<TextInput
				fullWidth
				label="Название"
				source="headline"
				validate={validateHeadline}
			/>
			<TextInput
				fullWidth
				label="Аннотация"
				multiline
				source="text"
				validate={validateAnnotation}
			/>
			<DateInput
				label="Дата создания"
				source="creationDate"
				validate={validateCreationDate}
				options={{ format: dateFormat, cancelLabel: cancelLabel }}
			/>
			<ArrayInput
				validate={validateAuthors}
				label="Авторы"
				source="authors"
			>
				<SimpleFormIterator>
					<TextInput
						label="Автор"
						source="author"
					/>
				</SimpleFormIterator>
			</ArrayInput>
			<ReferenceArrayInput
				fullWidth
				label="Подразделения"
				reference="subdivisions"
				source="subdivisions"
				perPage={1000}
			>
				<SelectArrayInput optionText="name" />
			</ReferenceArrayInput>
			<FileField
				source="file.url"
				title="file.title"
				label="PDF файл"
				target="_blank"
			/>
			<FileInput
				source="newfile"
				label="Новый файл"
				accept="application/pdf"
			>
				<FileField
					source="src"
					title="Загруженный файл"
				/>
			</FileInput>
		</SimpleForm>
	</Edit>
)

export const ShowForm = ({ permissions, enableActions, ...props }) => {
	const actions = enableActions ? <ShowActions permissions={permissions} /> : false
	return (
		<Show
			title={<Title />}
			actions={actions}
			{...props}>
			<SimpleShowLayout>
				<TextField
					label="Название"
					source="headline"
				/>
				<TextField
					label="Аннотация"
					source="text"
				/>
				<DateField
					label="Дата создания"
					source="creationDate"
					locales="ru-RU"
				/>
				<ArrayField
					label="Авторы"
					source="authors"
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
				<FileField
					source="file.url"
					title="file.title"
					label="PDF файл"
					target="_blank"
				/>
			</SimpleShowLayout>
		</Show>
	)
}

ShowForm.defaultProps = {
	enableActions: true,
}