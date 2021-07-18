import React from 'react'
import { ChipField, FileField, ReferenceField, Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin'
import { httpClient } from '../../providers/dataProvider.js'
import { createTitle, ShowActions } from '../../raComponents.js'

const Title = createTitle('Статья', 'headline')

export const ArticleShow = ({ permissions, ...props }) => (
	<Show
		title={<Title/>}
		actions={<ShowActions permissions={permissions}/>}
		{...props}
	>
		<SimpleShowLayout>
			<TextField
				label='Название'
				source='headline'
			/>
			<TextField
				label='Аннотация'
				source='abstract'
			/>
			<TextField
				label='Вид работы'
				source='type'
				emptyText='-'
			/>
			<ChipField
				label='Год создания'
				source='year'
			/>
			<TextField
				label='Объем'
				source='volume'
				emptyText='-'
			/>
			{/*<ArrayField
				label='Авторы'
				source='authors'
			>
				<SingleFieldList linkType={false}>
					<ChipField
						label='Автор'
						source='author'
					/>
				</SingleFieldList>
			</ArrayField>*/}
			<ReferenceField
				label='Место публикации'
				source='publicationPlace'
				reference='publications'
				link=''
			>
				<TextField source='name'/>
			</ReferenceField>
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
			{React.createElement(() => {
				const record = useRecordContext()
				return (
					<FileField
						source='file.url'
						title='file.name'
						label='Файл'
						//target='_blank'
						//download={record.file.name}
						/*onClick={async (e) => {
							e.preventDefault()
							saveAs(record.file.url, record.file.name)
						}}*/
					/>
				)
			})}
		</SimpleShowLayout>
	</Show>
)
