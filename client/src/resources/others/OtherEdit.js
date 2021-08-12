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

const validate = [required()]
const validateLength = [required(), minLength(1)]

const Title = createTitle('Научный труд', 'headline')

export const OtherEdit = (props) => (
	<Edit
		title={<Title/>}
		successMessage='Статья обновлена'
		undoable={false}
		actions={<EditActionsWithoutFile/>}
		{...props}
	>
		<SimpleForm submitOnEnter={false}>
			<TextInput
				label='Тип работы'
				source='type'
				validate={validateLength}
				fullWidth
			/>
			<ReferenceInput
				label='Категория'
				source='category'
				reference='categories'
			>
				<SelectInput optionText='name'/>
			</ReferenceInput>
			<TextInput
				label='Название'
				source='headline'
				validate={validateLength}
				fullWidth
			/>
			<TextInput
				label='Описание'
				source='text'
				validate={validateLength}
				fullWidth
				multiline
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
				label='Файл'
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
