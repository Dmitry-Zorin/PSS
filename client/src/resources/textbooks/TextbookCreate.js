import React from 'react'
import {
	ArrayInput,
	Create,
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

const validateText = [required(), minLength(1)]
const validateRequired = [required()]

export const TextbookCreate = (props) => (
	<Create
		title='Добавить учебник'
		successMessage='Учебник добавлен'
		undoable={false}
		{...props}
	>
		<SimpleForm
			redirect='list'
			submitOnEnter={false}
		>
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
				defaultValue='Учебник'
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
				source='authors'
				label='Авторы'
			>
				<SimpleFormIterator>
					<TextInput
						label='Автор'
						source='author'
					/>
				</SimpleFormIterator>
			</ArrayInput>
			<ReferenceInput
				label='Характер работы'
				source='character'
				reference='characters'
			>
				<SelectInput optionText='name'/>
			</ReferenceInput>
			<TextInput
				label='Выходные данные'
				source='exitData'
				fullWidth
				multiline
			/>
			<FileInput
				source='file'
				label='PDF файл'
			>
				<FileField
					source='file'
					title='Загруженный файл'
				/>
			</FileInput>
		</SimpleForm>
	</Create>
)
