import React from 'react'
import {
	ArrayInput,
	Edit, FileField, FileInput, minLength, NumberInput,
	ReferenceArrayInput, ReferenceInput, required,
	SelectArrayInput, SelectInput,
	SimpleForm,
	SimpleFormIterator,
	TextInput
} from 'react-admin'
import { DateInput } from 'react-admin-date-inputs2'
import { createTitle, getEditActionsWithoutFile } from '../../utils'

const validateHeadline = [required(), minLength(1)]
const validateAnnotation = [required(), minLength(1)]
const validateCreationDate = [required()]
const validateAuthors = [required()]

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

const Title = createTitle('Отчет', 'headline')

const EditActions = getEditActionsWithoutFile()

export const ReportEdit = (props) => (
	<Edit
		title={<Title />}
		successMessage="Отчет обновлен"
		undoable={false}
		actions={<EditActions />}
		{...props}>
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
			<ReferenceInput
				label="Место публикации"
				source="publicationPlace"
				reference="publications"
			>
				<SelectInput optionText="name" />
			</ReferenceInput>
			<ReferenceArrayInput
				fullWidth
				label="Подразделения"
				reference="subdivisions"
				source="subdivisions"
				perPage={1000}
			>
				<SelectArrayInput optionText="name" />
			</ReferenceArrayInput>
			<TextInput
				label="Выходные данные"
				source="exitData"
				fullWidth
				multiline
			/>
			<NumberInput
				label="Кол-во страниц"
				source="pages"
			/>
			<ReferenceInput
				label="Характер работы"
				source="character"
				reference="characters"
			>
				<SelectInput optionText="name" />
			</ReferenceInput>
			<FileField
				source="file.url"
				title="file.title"
				label="PDF файл"
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
		</SimpleForm>
	</Edit>
)
