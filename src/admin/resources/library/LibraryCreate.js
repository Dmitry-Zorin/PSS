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

const validateHeadline = [required(), minLength(1)]
const validateFile = [required()]

export const LibraryCreate = (props) => (
	<Create
		title="Добавить книгу"
		successMessage="ra.resources.library.create"
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
			<FileInput
				label="Файл"
				source="file"
				validate={validateFile}
			>
				<FileField
					title="Загруженный файл"
					source="file"
				/>
			</FileInput>
		</SimpleForm>
	</Create>
)
