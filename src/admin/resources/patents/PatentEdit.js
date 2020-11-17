import React from 'react'
import {
	ArrayInput,
	Edit,
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
import { createTitle, getEditActionsWithoutFile } from '../../utils'

const validateHeadline = [required(), minLength(1)]
const validateDescription = [required(), minLength(1)]
const validateCreationDate = [required()]
const validateAuthors = [required()]

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

const Title = createTitle('Петент', 'headline')

const EditActions = getEditActionsWithoutFile()

export const PatentEdit = props => (
	<Edit
		title={<Title />}
		successMessage="Патент обновлен"
		undoable={false}
		actions={<EditActions />}
		{...props}
	>
		<SimpleForm
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
			<FileField
				label="Архив"
				source="file.url"
				title="file.title"
				target="_blank"
			/>
			<FileInput
				label="Новый файл"
				source="newfile"
				accept="application/x-rar-compressed, application/zip"
			>
				<FileField
					title="Загруженный файл"
					source="src"
				/>
			</FileInput>
			<TextInput
				label='Код свидетельства'
				source='certificateCode'
			/>
			<FileField
				label="Свидетельство"
				source="certificateFile.url"
				title="certificateFile.title"
				target="_blank"
			/>
			<FileInput
				label="Новое свидетельство"
				source="newCertificateFile"
				accept="application/pdf"
			>
				<FileField
					title="Загруженное свидетельство"
					source="certificate.file"
				/>
			</FileInput>
		</SimpleForm>
	</Edit>
)
