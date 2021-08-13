import React from 'react'
import {
	Edit,
	ImageField,
	ImageInput,
	minLength,
	NumberInput,
	required,
	SimpleForm,
	TextInput,
} from 'react-admin'
import photoPlaceholder from '../../assets/photo-placeholder.jpg'
import { createTitle, EditActionsWithoutFile } from '../../components/inputs'

const validateText = [required(), minLength(1)]

const Title = createTitle('Взвода', 'name')

export const PlatoonEdit = (props) => (
	<Edit
		title={<Title/>}
		successMessage='ra.resources.platoon.edit'
		undoable={false}
		actions={<EditActionsWithoutFile/>}
		style={{ width: '100%', maxWidth: 1050, margin: '0 auto' }}
		{...props}
	>
		<SimpleForm submitOnEnter={false}>
			<ImageField
				label='Фото'
				source='file.url'
				title='file.title'
				emptyText={(
					<img src={photoPlaceholder} alt='photo' style={{ maxHeight: 300 }}/>
				)}
			/>
			<ImageInput
				label='Новое фото'
				source='newfile'
			>
				<ImageField
					title='Загруженное фото'
					source='src'
				/>
			</ImageInput>
			<TextInput
				label='Название'
				source='name'
				validate={validateText}
				fullWidth
			/>
			<NumberInput
				label='Номер взвода'
				source='platoonNumber'
				fullWidth
			/>
			<NumberInput
				label='Номер роты'
				source='companyNumber'
				fullWidth
			/>
			<TextInput
				label='Направление'
				source='specialty'
				fullWidth
			/>
			<TextInput
				label='Командир взвода'
				source='platoonCommander'
				fullWidth
			/>
			<NumberInput
				label='Количество операторов'
				source='numOfPeople'
				fullWidth
			/>
		</SimpleForm>
	</Edit>
)
