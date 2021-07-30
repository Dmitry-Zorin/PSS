import React from 'react'
import {
	ArrayInput,
	Create,
	FileField,
	FileInput,
	minLength,
	NumberInput,
	ReferenceArrayInput,
	ReferenceInput,
	required,
	SelectArrayInput,
	SelectInput,
	SimpleForm,
	SimpleFormIterator,
	TextInput,
} from 'react-admin'

const validateText = [required(), minLength(1)]
const validateRequired = [required()]

export const DissertationCreate = (props) => (
	<Create
		title='Добавить диссертацию'
		successMessage='Диссертация добавлена'
		undoable={false}
		{...props}>
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
				defaultValue='Диссертация'
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
				label='Место публикации'
				source='publicationPlace'
				reference='publications'
			>
				<SelectInput optionText='name'/>
			</ReferenceInput>
			<ReferenceArrayInput
				fullWidth
				label='Подразделения'
				reference='subdivisions'
				source='subdivisions'
				perPage={1000}
			>
				<SelectArrayInput optionText='name'/>
			</ReferenceArrayInput>
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
