import React from 'react'
import {
	ArrayInput,
	Edit,
	FileField,
	FileInput,
	minLength,
	NumberInput,
	ReferenceArrayInput,
	required,
	SelectArrayInput,
	SimpleForm,
	SimpleFormIterator,
	TextInput,
} from 'react-admin'
import { createTitle, EditActionsWithoutFile } from '../../raComponents.js'

const validateText = [required(), minLength(1)]
const validateRequired = [required()]

const Title = createTitle('Программа', 'headline')

export const ProgramEdit = (props) => (
	<Edit
		title={<Title/>}
		successMessage='Программа обновлена'
		undoable={false}
		actions={<EditActionsWithoutFile/>}
		{...props}>
		<SimpleForm submitOnEnter={false}>
			<TextInput
				label='Название'
				source='headline'
				validate={validateText}
				fullWidth
				multiline
			/>
			<TextInput
				label='Описание'
				source='description'
				validate={validateText}
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
			<ReferenceArrayInput
				fullWidth
				label='Подразделения'
				reference='subdivisions'
				source='subdivisions'
				perPage={1000}
			>
				<SelectArrayInput optionText='name'/>
			</ReferenceArrayInput>
			<FileField
				source='file.url'
				title='file.title'
				label='Архив с программой'
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
			<TextInput
				label='Код свидетельства'
				source='certificate.code'
			/>
			<FileField
				label='Свидетельство'
				source='certificate.file.url'
				title='certificate.code'
				target='_blank'
			/>
			<FileInput
				label='Новое свидетельство'
				source='newCertificateFile'
			>
				<FileField
					title='Загруженное свидетельство'
					source='src'
				/>
			</FileInput>
		</SimpleForm>
	</Edit>
)
