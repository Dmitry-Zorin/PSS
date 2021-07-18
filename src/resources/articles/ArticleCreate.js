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

export const ArticleCreate = (props) => (
	<Create title='Добавить статью' {...props}>
		<SimpleForm>
			<TextInput
				label='Название'
				source='headline'
				validate={validateText}
				fullWidth
				multiline
			/>
			<TextInput
				label='Аннотация'
				source='abstract'
				fullWidth
				multiline
			/>
			<TextInput
				label='Вид работы'
				source='type'
				validate={validateText}
				defaultValue='Статья'
			/>
			<NumberInput
				label='Год создания'
				source='year'
			/>
			<NumberInput
				label='Объем'
				source='volume'
			/>
			<ArrayInput
				label='Авторы'
				source='authors'
				validate={required()}
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
			<FileInput source='file' label='Файл'>
				<FileField source='src' title='article'/>
			</FileInput>
		</SimpleForm>
	</Create>
)
