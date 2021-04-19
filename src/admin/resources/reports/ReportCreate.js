import React from 'react'
import {
	ArrayInput,
	Create, FileField, FileInput, minLength, NumberInput,
	ReferenceArrayInput, ReferenceInput, required,
	SelectArrayInput, SelectInput,
	SimpleForm,
	SimpleFormIterator,
	TextInput
} from 'react-admin'
import { DateInput } from 'react-admin-date-inputs2'

const validateHeadline = [required(), minLength(1)]
const validateAnnotation = [required(), minLength(1)]
const validateCreationDate = [required()]
const validateAuthors = [required()]

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

export const ReportCreate = (props) => (
	<Create
		title="Добавить отчет"
		successMessage="Отчет добавлен"
		undoable={false}
		{...props}>
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
			/>
			<DateInput
				label="Дата создания"
				source="creationDate"
				validate={validateCreationDate}
				options={{ format: dateFormat, cancelLabel: cancelLabel }}
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
			<ReferenceInput
				label="Характер работы"
				source="character"
				reference="characters"
			>
				<SelectInput optionText="name" />
			</ReferenceInput>
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
			<FileInput
				source="file"
				label="PDF файл"
			>
				<FileField
					source="file"
					title="Загруженный файл"
				/>
			</FileInput>
		</SimpleForm>
	</Create>
)
