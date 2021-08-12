import React from 'react'
import {
	ArrayField,
	ChipField,
	FileField,
	ReferenceField,
	Show,
	SimpleShowLayout,
	SingleFieldList,
	TextField,
} from 'react-admin'
import { createTitle, ShowActions } from '../../components/old'

const Title = createTitle('Диссертация', 'headline')

export const DissertationShow = ({
	permissions,
	enableActions = true,
	...props
}) => (
	<Show
		title={<Title/>}
		actions={enableActions && <ShowActions permissions={permissions}/>}
		{...props}>
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
