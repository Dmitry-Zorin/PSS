import React from 'react'
import {
	Create,
	ImageField,
	ImageInput,
	minLength,
	NumberInput,
	required,
	SimpleForm,
	TextInput,
} from 'react-admin'

const validateText = [required(), minLength(1)]

export const PlatoonCreate = (props) => (
	<Create
		title='Добавить взвод'
		successMessage='ra.resources.platoon.create'
		undoable={false}
		style={{ width: '100%', maxWidth: 1050, margin: '0 auto' }}
		{...props}
	>
		<SimpleForm
			redirect='list'
			submitOnEnter={false}
		>
			<ImageInput
				label='Фото'
				source='file'
			>
				<ImageField
					source='src'
					title='Загруженное фото'
				/>
			</ImageInput>
			<TextInput
				label='Название'
				source='name'
				validate={validateText}
				fullWidth
			/>
			<TextInput
				label='Направление'
				source='specialty'
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
				label='Специальность'
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
	</Create>
)
