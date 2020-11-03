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

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

const validateHeadline = [required(), minLength(1),]
const validateAnnotation = [required(), minLength(1),]
const validateCreationDate = [required(),]
const validateAuthors = [required(),]
const validateFile = [required(),]

export const LibraryCreate = (props) => (
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
				label="PDF файл или архив"
				accept={[
					'application/pdf',
					'application/x-rar-compressed',
					'application/zip'
				]}
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
