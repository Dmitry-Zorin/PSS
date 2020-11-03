import React from 'react'
import {
	ArrayInput,
	Edit, FileField, FileInput, minLength,
	ReferenceArrayInput, required,
	SelectArrayInput,
	SimpleForm,
	SimpleFormIterator,
	TextInput
} from 'react-admin'
import { DateInput } from 'react-admin-date-inputs2'
import { createTitle, getEditActionsWithoutFile } from '../../utils'

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

const validateHeadline = [required(), minLength(1),]
const validateAnnotation = [required(), minLength(1),]
const validateCreationDate = [required(),]
const validateAuthors = [required(),]

const Title = createTitle('Библиотека', 'headline')

const EditActions = getEditActionsWithoutFile()

export const LibraryEdit = (props) => (
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
				label="PDF файл или архив"
				target="_blank"
			/>
			<FileInput
				source="newfile"
				label="Новый файл"
				accept={[
					'application/pdf',
					'application/x-rar-compressed',
					'application/zip'
				]}
			>
				<FileField
					source="src"
					title="Загруженный файл"
				/>
			</FileInput>
		</SimpleForm>
	</Edit>
)
