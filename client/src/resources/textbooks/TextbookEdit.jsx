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
	TextInput,
} from 'react-admin'
import { createTitle, EditActionsWithoutFile } from '../../components/inputs'

const validateText = [required(), minLength(1)]
const validateRequired = [required()]

const Title = createTitle('Учебник', 'headline')

export const TextbookEdit = (props) => (
	<Edit
		title={<Title/>}
		successMessage='Учебник обновлен'
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
				multiline
			/>
			<TextInput
				label='Аннотация'
				source='text'
				fullWidth
				multiline
			/>
			<TextInput
				label='Вид работы'
				source='type'
				validate={validateText}
			/>
			<NumberInput
				label='Год создания'
				source='creationDate'
			/>
			<NumberInput
				label='Объем'
				source='volume'
			/>
			<ArrayInput
				validate={validateRequired}
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
			<TextInput
				label='Выходные данные'
				source='exitData'
				fullWidth
				multiline
			/>
			<ReferenceInput
				label='Характер работы'
				source='character'
				reference='characters'
			>
				<SelectInput optionText='name'/>
			</ReferenceInput>
			<FileField
				source='file.url'
				title='file.title'
				label='PDF файл'
				target='_blank'
			/>
			<FileInput
				source='newfile'
				label='Новый файл'
			>
				<FileField
					source='src'
					title='Загруженный файл'
				/>
			</FileInput>
		</SimpleForm>
	</Edit>
)
