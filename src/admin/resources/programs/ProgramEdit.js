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

const validateHeadline = [required(), minLength(1)]
const validateDescription = [required(), minLength(1)]
const validateCreationDate = [required()]
const validateAuthors = [required()]

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

const Title = createTitle('Программа', 'headline')

const EditActions = getEditActionsWithoutFile()

export const ProgramEdit = (props) => (
	<Edit
		title={<Title />}
		successMessage="Программа обновлена"
		undoable={false}
		actions={<EditActions />}
		{...props}>
		<SimpleForm
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
				label="Описание"
				multiline
				source="description"
				validate={validateDescription}
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
				label="Архив с программой"
				target="_blank"
			/>
			<FileInput
				source="newfile"
				label="Новый файл"
			>
				<FileField
					source="src"
					title="Загруженный файл"
				/>
			</FileInput>
			<TextInput
				label='Код свидетельства'
				source='certificate.code'
			/>
			<FileField
				label="Свидетельство"
				source="certificate.file.url"
				title="certificate.code"
				target="_blank"
			/>
			<FileInput
				label="Новое свидетельство"
				source="newCertificateFile"
			>
				<FileField
					title="Загруженное свидетельство"
					source="src"
				/>
			</FileInput>
		</SimpleForm>
	</Edit>
)
