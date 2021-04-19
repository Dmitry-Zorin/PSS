import React from 'react'
import {
	ArrayInput,
	Edit,
	FileField,
	FileInput, ImageField, ImageInput,
	minLength,
	ReferenceArrayInput,
	required,
	SelectArrayInput,
	SimpleForm,
	SimpleFormIterator,
	TextInput
} from 'react-admin'
import { createTitle, getEditActionsWithoutFile } from '../../utils'

const validateHeadline = [required(), minLength(1)]

const Title = createTitle('Сотрудники', 'headline')

const EditActions = getEditActionsWithoutFile()

export const EmployeeEdit = (props) => (
	<Edit
		title={<Title />}
		successMessage="ra.resources.employees.edit"
		undoable={false}
		actions={<EditActions />}
		{...props}
	>
		<SimpleForm submitOnEnter={false}>
			<ImageField
				label="Фото"
				source="photo"
			/>
			<ImageInput
				label="Новое фото"
				source="newphoto"
			>
				<ImageField source="newphoto" />
			</ImageInput>
			<TextInput
				label="Название"
				source="headline"
				validate={validateHeadline}
				fullWidth
			/>
			<TextInput
				label="Описание"
				source="text"
				multiline
				fullWidth
			/>
			<ArrayInput
				label="Ключевые слова"
				source="tags"
			>
				<SimpleFormIterator>
					<TextInput
						label="Ключевое слово"
						source="tag"
					/>
				</SimpleFormIterator>
			</ArrayInput>
			<ArrayInput
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
				label="Подразделения"
				source="subdivisions"
				reference="subdivisions"
				perPage={1000}
				fullWidth
			>
				<SelectArrayInput optionText="name" />
			</ReferenceArrayInput>
			<FileField
				label="Файл"
				source="file.url"
				title="file.title"
				target="_blank"
			/>
			<FileInput
				label="Новый файл"
				source="newfile"
			>
				<FileField
					title="Загруженный файл"
					source="src"
				/>
			</FileInput>
		</SimpleForm>
	</Edit>
)