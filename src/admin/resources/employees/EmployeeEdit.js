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
import photoPlaceholder from '../../../../static/images/photo-placeholder.jpg'
import { createTitle, getEditActionsWithoutFile } from '../../../utils/raUtils'

const validateText = [required(), minLength(1)]

const Title = createTitle('Сотрудники', 'name')

const EditActions = getEditActionsWithoutFile()

export const EmployeeEdit = (props) => (
	<Edit
		title={<Title/>}
		successMessage='ra.resources.employee.edit'
		undoable={false}
		actions={<EditActions/>}
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
				label='ФИО'
				source='name'
				validate={validateText}
				fullWidth
			/>
			<TextInput
				label='Дата рождения'
				source='birthDate'
				fullWidth
			/>
			<TextInput
				label='Место рождения'
				source='birthPlace'
				fullWidth
			/>
			<TextInput
				label='Национальность'
				source='nationality'
				fullWidth
			/>
			<TextInput
				label='Образование'
				source='education'
				fullWidth
			/>
			<TextInput
				label='Окончил (когда, что)'
				source='university'
				fullWidth
			/>
			<TextInput
				label='Специальность'
				source='specialty'
				fullWidth
			/>
			<TextInput
				label='Владение иностранными языками'
				source='languages'
				fullWidth
			/>
			<TextInput
				label='Призван (каким ВК)'
				source='militaryCommissariat'
				fullWidth
			/>
			<TextInput
				label='Воинское звание'
				source='militaryRank'
				fullWidth
			/>
			<TextInput
				label='Дата призыва'
				source='draftDate'
				fullWidth
			/>
			<TextInput
				label='Работа до призыва в армию'
				source='jobBefore'
				fullWidth
			/>
			<TextInput
				label='Научная тема в ВИТ "ЭРА"'
				source='researchTopic'
				fullWidth
			/>
			<TextInput
				label='Достижения в научной деятельности во время службы в ВИТ "ЭРА"'
				source='achievements'
				fullWidth
			/>
			<TextInput
				label='Работа после увольнения из ВИТ "ЭРА"'
				source='jobAfter'
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
			<NumberInput
				label='ID сотрудника в системе "Redmine"'
				source='redmineId'
				fullWidth
			/>
		</SimpleForm>
	</Edit>
)
