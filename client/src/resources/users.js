import React from 'react'
import {
	BooleanField,
	BooleanInput,
	Create,
	Datagrid,
	Filter,
	List,
	minLength,
	NullableBooleanInput,
	required,
	Show,
	SimpleForm,
	SimpleShowLayout,
	TextField,
	TextInput,
} from 'react-admin'
import { createEmptyPage, createTitle, ShowActions } from '../components/old'

const validateUsername = [required(), minLength(1)]
const validatePassword = [required(), minLength(8)]

const Title = createTitle('Пользователи', 'users')
const Empty = createEmptyPage(
	'Нет зарегистрированных пользователей',
	'Для добавления пользователя нажмите кнопку "Создать"',
)

const Filters = (props) => (
	<Filter {...props}>
		<TextInput
			label='Поиск по логину'
			source='username'
			alwaysOn
		/>
		<NullableBooleanInput
			label='Администратор'
			source='isAdmin'
			displayNull
		/>
	</Filter>
)

export const ListForm = props => (
	<List
		title='Список пользователей'
		filters={<Filters/>}
		perPage={25}
		exporter={false}
		sort={{ field: 'username', order: 1 }}
		empty={<Empty/>}
		{...props}
	>
		<Datagrid
			rowClick='show'
			expand={<ShowForm enableActions={false}/>}
		>
			<TextField
				label='Логин'
				source='username'
			/>
			<BooleanField
				label='Администратор'
				source='isAdmin'
			/>
		</Datagrid>
	</List>
)

export const CreateForm = props => (
	<Create
		title='Добавить пользователя'
		successMessage='Пользователь добавлен'
		undoable={false}
		{...props}>
		<SimpleForm
			redirect='list'
			submitOnEnter={false}
		>
			<TextInput
				fullWidth
				label='Логин'
				source='username'
				validate={validateUsername}
			/>
			<TextInput
				fullWidth
				label='Пароль'
				source='password'
				validate={validatePassword}
			/>
			<BooleanInput
				label='Администратор'
				source='isAdmin'
			/>
		</SimpleForm>
	</Create>
)

export const ShowForm = ({ enableActions, ...props }) => (
	<Show
		title={<Title/>}
		actions={enableActions && <ShowActions permissions={permissions}/>}
		{...props}>
		<SimpleShowLayout>
			<TextField
				label='Логин'
				source='username'
			/>
			<BooleanField
				label='Администратор'
				source='isAdmin'
			/>
		</SimpleShowLayout>
	</Show>
)
