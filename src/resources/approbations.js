import React from 'react'
import {
	ArrayField,
	ArrayInput,
	ChipField,
	Create,
	Datagrid,
	Edit,
	FileField,
	FileInput,
	Filter,
	List,
	minLength,
	NumberInput,
	required,
	Show,
	SimpleForm,
	SimpleFormIterator,
	SimpleShowLayout,
	SingleFieldList,
	TextField,
	TextInput,
} from 'react-admin'
import { DescriptionField, HeadlineField } from '../CustomFields'
import {
	createEmptyPage,
	createTitle,
	BulkActionButtons,
	EditActionsWithoutFile,
	ShowActions,
} from '../raComponents.js'

const validateText = [required(), minLength(1)]
const validateRequired = [required()]

const Title = createTitle('Апробация', 'headline')
const Empty = createEmptyPage(
	'Нет доступных апробаций',
	'Для добавления апробации нажмите кнопку "Создать"',
)

const Filters = (props) => (
	<Filter {...props}>
		<TextInput
			label='Поиск по названию'
			source='headline'
			alwaysOn
		/>
		<TextInput
			label='Описание'
			source='description'
		/>
		<TextInput
			label='Головной исполнитель'
			source='headPerformer'
		/>
		<TextInput
			label='Заказчик'
			source='customer'
		/>
		<TextInput
			label='Cоисполнитель'
			source='authors'
		/>
	</Filter>
)

export const ListForm = ({ permissions, ...props }) => (
	<List
		title='Список апробаций'
		filters={<Filters/>}
		perPage={25}
		exporter={false}
		sort={{ field: 'firstCreationDate', order: 'DESC' }}
		empty={<Empty/>}
		bulkActionButtons={<BulkActionButtons permissions={permissions}/>}
		{...props}
	>
		<Datagrid
			rowClick='show'
			expand={<ShowForm enableActions={false}/>}
		>
			<HeadlineField
				label='Название'
				source='headline'
			/>
			<DescriptionField
				label='Описание'
				source='description'
				maxchars={250}
			/>
			<TextField
				label='Головной исполнитель'
				source='headPerformer'
			/>
			<TextField
				label='Заказчик'
				source='customer'
			/>
			<ArrayField
				source='authors'
				label='Соисполнители'
			>
				<SingleFieldList linkType={false}>
					<ChipField
						label='Соисполнитель'
						source='author'
					/>
				</SingleFieldList>
			</ArrayField>
			<TextField
				label='Год создания'
				source='creationDate'
			/>
		</Datagrid>
	</List>
)

export const CreateForm = props => (
	<Create
		title='Добавить апробацию'
		successMessage='Апробация добавлена'
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
				label='Описание'
				source='description'
				validate={validateText}
				fullWidth
				multiline
			/>
			<TextInput
				label='Головной исполнитель'
				source='headPerformer'
			/>
			<TextInput
				label='Заказчик'
				source='customer'
			/>
			<ArrayInput
				validate={validateRequired}
				source='authors'
				label='Соискатели'
			>
				<SimpleFormIterator>
					<TextInput
						label='Соискатель'
						source='author'
					/>
				</SimpleFormIterator>
			</ArrayInput>
			<NumberInput
				label='Год создания'
				source='creationDate'
			/>
			<NumberInput
				label='Объем'
				source='volume'
			/>
			<FileInput
				source='file'
				label='Архив'
				validate={validateRequired}
			>
				<FileField
					source='file'
					title='Загруженный файл'
				/>
			</FileInput>
		</SimpleForm>
	</Create>
)

export const EditForm = props => (
	<Edit
		title={<Title/>}
		successMessage='Апробация обновлена'
		undoable={false}
		actions={<EditActionsWithoutFile/>}
		{...props}
	>
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
				label='Головной исполнитель'
				source='headPerformer'
			/>
			<TextInput
				label='Заказчик'
				source='customer'
			/>
			<ArrayInput
				validate={validateRequired}
				label='Соискатели'
				source='authors'
			>
				<SimpleFormIterator>
					<TextInput
						label='Соискатель'
						source='author'
					/>
				</SimpleFormIterator>
			</ArrayInput>
			<NumberInput
				label='Год создания'
				source='creationDate'
			/>
			<NumberInput
				label='Объем'
				source='volume'
			/>
			<FileField
				source='file.url'
				title='file.title'
				label='Архив'
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

export const ShowForm = ({ permissions, enableActions, ...props }) => (
	<Show
		title={<Title/>}
		actions={enableActions && <ShowActions permissions={permissions}/>}
		{...props}
	>
		<SimpleShowLayout>
			<TextField
				label='Название'
				source='headline'
			/>
			<TextField
				label='Описание'
				source='description'
			/>
			<TextField
				label='Головной исполнитель'
				source='headPerformer'
			/>
			<TextField
				label='Заказчик'
				source='customer'
			/>
			<ArrayField
				label='Соискатели'
				source='authors'
			>
				<SingleFieldList linkType={false}>
					<ChipField
						label='Соискатель'
						source='author'
					/>
				</SingleFieldList>
			</ArrayField>
			<TextField
				label='Категория'
				source='category'
			/>
			<ChipField
				label='Год создания'
				source='creationDate'
			/>
			<TextField
				label='Объем'
				source='volume'
				emptyText='-'
			/>
			<FileField
				source='file.url'
				title='file.title'
				label='Архив'
				target='_blank'
			/>
		</SimpleShowLayout>
	</Show>
)

ShowForm.defaultProps = {
	enableActions: true,
}