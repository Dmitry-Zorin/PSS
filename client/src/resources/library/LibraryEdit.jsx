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
	TextInput,
} from 'react-admin'
import { createTitle, EditActionsWithoutFile } from '../components/inputs'

const validateText = [required(), minLength(1)]

const Title = createTitle('Библиотека', 'headline')

export const LibraryEdit = (props) => (
	<Edit
		title={<Title/>}
		successMessage='ra.resources.library.edit'
		undoable={false}
		actions={<EditActionsWithoutFile/>}
		{...props}
	>
		<SimpleForm submitOnEnter={false}>
			<TextInput
				label='Название'
				source='headline'
				validate={validateText}
				fullWidth
			/>
			<TextInput
				label='Описание'
				source='text'
				multiline
				fullWidth
			/>
			<ArrayInput
				label='Ключевые слова'
				source='tags'
			>
				<SimpleFormIterator>
					<TextInput
						label='Ключевое слово'
						source='tag'
					/>
				</SimpleFormIterator>
			</ArrayInput>
			<ArrayInput
				label='Авторы'
				source='authors'
			>
				<SimpleFormIterator>
					<TextInput
						label='Автор'
						source='author'
					/>
				</SimpleFormIterator>
			</ArrayInput>
			<ReferenceArrayInput
				label='Подразделения'
				source='subdivisions'
				reference='subdivisions'
				perPage={1000}
				fullWidth
			>
				<SelectArrayInput optionText='name'/>
			</ReferenceArrayInput>
			<FileField
				label='Файл'
				source='file.url'
				title='file.title'
				target='_blank'
			/>
			<FileInput
				label='Новый файл'
				source='newfile'
			>
				<FileField
					title='Загруженный файл'
					source='src'
				/>
			</FileInput>
		</SimpleForm>
	</Edit>
)
