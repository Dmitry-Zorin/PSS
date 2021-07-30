import React from 'react'
import {
	ArrayField,
	ChipField,
	FileField,
	ReferenceArrayField,
	ReferenceField,
	Show,
	SimpleShowLayout,
	SingleFieldList,
	TextField,
} from 'react-admin'
import { createTitle, ShowActions } from '../../raComponents.js'

const Title = createTitle('Автореферат', 'headline')

export const AbstractShow = ({
	permissions,
	enableActions = true,
	...props
}) => (
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
				label='Аннотация'
				source='text'
			/>
			<TextField
				label='Вид работы'
				source='type'
				emptyText='-'
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
			<ArrayField
				label='Авторы'
				source='authors'
			>
				<SingleFieldList linkType={false}>
					<ChipField
						label='Автор'
						source='author'
					/>
				</SingleFieldList>
			</ArrayField>
			<ReferenceField
				label='Место публикации'
				source='publicationPlace'
				reference='publications'
				link=''
			>
				<TextField source='name'/>
			</ReferenceField>
			<ReferenceArrayField
				label='Подразделения'
				reference='subdivisions'
				source='subdivisions'
			>
				<SingleFieldList>
					<ChipField source='name'/>
				</SingleFieldList>
			</ReferenceArrayField>
			<TextField
				label='Выходные данные'
				source='exitData'
				emptyText='-'
			/>
			<ReferenceField
				label='Характер работы'
				source='character'
				reference='characters'
			>
				<ChipField source='name'/>
			</ReferenceField>
			<FileField
				source='file.url'
				title='file.title'
				label='PDF файл'
				target='_blank'
			/>
		</SimpleShowLayout>
	</Show>
)
