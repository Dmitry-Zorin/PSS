import React from 'react'
import {
	ArrayInput,
	Edit,
	FileField,
	FileInput,
	minLength,
	NumberInput,
	ReferenceInput,
	required,
	SelectInput,
	SimpleForm,
	SimpleFormIterator,
	TextInput
} from 'react-admin'
import { DateInput } from 'react-admin-date-inputs2'
import { createTitle, getEditActionsWithoutFile } from '../../utils'

const validate = [required()]
const validateLength = [required(), minLength(1)]

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

const Title = createTitle('Научный труд', 'headline')

const EditActions = getEditActionsWithoutFile()

export const OtherEdit = (props) => (
	<Edit
		title={<Title />}
		successMessage="Статья обновлена"
		undoable={false}
		actions={<EditActions />}
		{...props}>
		<SimpleForm submitOnEnter={false}>
			<TextInput
				label="Тип работы"
				source="type"
				validate={validateLength}
				fullWidth
			/>
			<TextInput
				label="Название"
				source="headline"
				validate={validateLength}
				fullWidth
			/>
			<TextInput
				label="Описание"
				source="text"
				validate={validateLength}
				fullWidth
				multiline
			/>
			<DateInput
				label="Дата создания"
				source="creationDate"
				validate={validate}
				options={{ format: dateFormat, cancelLabel: cancelLabel }}
			/>
			<ArrayInput
				validate={validate}
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
				label="Файл"
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
