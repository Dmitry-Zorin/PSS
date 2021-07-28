import React from 'react'
import {
	Create,
	Datagrid,
	Edit,
	Filter,
	List,
	minLength,
	required,
	Show,
	SimpleForm,
	SimpleShowLayout,
	TextField,
	TextInput,
} from 'react-admin'
import {
	BulkActionButtons,
	createEmptyPage,
	createTitle,
	EditActions,
	ShowActions,
} from '../raComponents.js'

const validateName = [required(), minLength(1)]

const Title = createTitle('Отдел', 'name')
const Empty = createEmptyPage(
	'Нет доступных отделов',
	'Для добавления отдела нажмите кнопку "Создать"',
)

const Filters = (props) => (
	<Filter {...props}>
		<TextInput
			label='Поиск по названию'
			source='name'
			alwaysOn
		/>
	</Filter>
)

export const ListForm = ({ permissions, ...props }) => (
	<List
		title='Список отделов'
		filters={<Filters/>}
		perPage={25}
		exporter={false}
		sort={{ field: 'firstCreationDate', order: 'DESC' }}
		empty={<Empty/>}
		bulkActionButtons={<BulkActionButtons permissions={permissions}/>}
		{...props}
	>
		<Datagrid
			rowClick={permissions ? 'edit' : 'show'}
			expand={<ShowForm enableActions={false}/>}
		>
			<TextField
				label='Название'
				source='name'
			/>
		</Datagrid>
	</List>
)

export const CreateForm = props => (
	<Create
		title='Добавить отдел'
		successMessage='Отдел добавлен'
		undoable={false}
		{...props}
	>
		<SimpleForm
			redirect='list'
			submitOnEnter={false}
		>
			<TextInput
				fullWidth
				label='Название'
				source='name'
				validate={validateName}
			/>
		</SimpleForm>
	</Create>
)

export const EditForm = props => (
	<Edit
		title={<Title/>}
		successMessage='Отдел обновлён'
		undoable={false}
		actions={<EditActions/>}
		{...props}
	>
		<SimpleForm submitOnEnter={false}>
			<TextInput
				fullWidth
				label='Название'
				source='name'
				validate={validateName}
			/>
		</SimpleForm>
	</Edit>
)

export const ShowForm = ({ permissions, enableActions, ...props }) => (
	<Show
		title={<Title/>}
		actions={enableActions && <ShowActions permissions={permissions}/>}
		{...props}
	>
		<SimpleShowLayout>
			<TextField
				label='Название'
				source='name'
			/>
		</SimpleShowLayout>
	</Show>
)

ShowForm.defaultProps = {
	enableActions: true,
}
