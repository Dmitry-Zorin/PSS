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
				fullWidth
				label="Название"
				source="headline"
				validate={validateHeadline}
			/>
			<TextInput
				fullWidth
				label="Описание"
				multiline
				source="text"
				options={{ multiLine: true }}
			/>
			<ArrayInput
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
				label="Файл"
				accept={[
					'application/pdf',
					'application/x-rar-compressed',
					'application/zip',
					'image/vnd.djvu',
					'application/epub+zip',
					'application/x-mobipocket-ebook',
					'application/msword',
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
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
