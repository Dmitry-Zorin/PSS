import React from 'react'
import {
	ArrayInput,
	Create,
	FileField,
	FileInput,
	minLength,
	ReferenceArrayInput,
	required,
	SelectArrayInput,
	SimpleForm,
	SimpleFormIterator,
	TextInput
} from 'react-admin'
import { DateInput } from 'react-admin-date-inputs2'

const validateHeadline = [required(), minLength(1)]
const validateDescription = [required(), minLength(1)]
const validateCreationDate = [required()]
const validateAuthors = [required()]
const validateFile = [required()]

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

export const PatentCreate = (props) => (
	<Create
		title="Добавить патент"
		successMessage="Патент добавлен"
		undoable={false}
		{...props}
	>
		<SimpleForm
			redirect="list"
			submitOnEnter={false}
		>
			<TextInput
				label="Название"
				source="headline"
				validate={validateHeadline}
				fullWidth
			/>
			<TextInput
				label="Описание"
				source="description"
				validate={validateDescription}
				fullWidth
				multiline
			/>
			<DateInput
				label="Дата создания"
				source="creationDate"
				validate={validateCreationDate}
				options={{ format: dateFormat, cancelLabel: cancelLabel }}
			/>
			<ArrayInput
				label="Авторы"
				source="authors"
				validate={validateAuthors}
			>
				<SimpleFormIterator>
					<TextInput
						label="Автор"
						source="author"
					/>
				</SimpleFormIterator>
			</ArrayInput>
			<ReferenceArrayInput
				label="Подразделения"
				source="subdivisions"
				reference="subdivisions"
				perPage={1000}
				fullWidth
			>
				<SelectArrayInput optionText="name" />
			</ReferenceArrayInput>
			<FileInput
				label="Архив"
				source="file"
				accept={[
					'application/zip',
					'application/octet-stream',
					'application/x-rar-compressed',
					'application/vnd.rar',
					'application/x-7z-compressed'
				].join(', ')}
				validate={validateFile}
			>
				<FileField
					title="Загруженный файл"
					source="file"
				/>
			</FileInput>
			<TextInput
				label='Код свидетельства'
				source='certificateCode'
			/>
			<FileInput
				label="Свидетельство"
				source="certificateFile"
				accept="application/pdf"
			>
				<FileField
					title="Загруженное свидетельство"
					source="certificateFile"
				/>
			</FileInput>
		</SimpleForm>
	</Create>
)
