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
import { createTitle, getEditActionsWithoutFile } from '../../utils'

const validateHeadline = [required(), minLength(1)]

const Title = createTitle('Библиотека', 'headline')

const EditActions = getEditActionsWithoutFile()

export const LibraryEdit = (props) => (
	<Edit
		title={<Title />}
		successMessage="ra.resources.library.edit"
		undoable={false}
		actions={<EditActions />}
		{...props}
	>
		<SimpleForm submitOnEnter={false}>
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
			/>
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
				label="Файл"
				target="_blank"
			/>
			<FileInput
				source="newfile"
				label="Новый файл"
				accept={[
					'application/pdf',
					'application/x-rar-compressed',
					'application/zip'
				]}
			>
				<FileField
					source="src"
					title="Загруженный файл"
				/>
			</FileInput>
		</SimpleForm>
	</Edit>
)
