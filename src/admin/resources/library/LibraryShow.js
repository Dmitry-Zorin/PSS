import React from 'react'
import {
	ArrayField,
	ChipField,
	DateField,
	FileField,
	ReferenceArrayField,
	Show,
	SimpleShowLayout,
	SingleFieldList,
	TextField
} from 'react-admin'
import { createTitle, getShowActions } from '../../utils'

const Title = createTitle('Книга', 'headline')

const ShowActions = getShowActions()

export const LibraryShow = ({ permissions, enableActions = true, ...props }) => (
	<Show
		title={<Title />}
		actions={!enableActions ? undefined : (
			<ShowActions permissions={permissions} />
		)}
		{...props}>
		<SimpleShowLayout>
			<TextField
				label="Название"
				source="headline"
			/>
			<TextField
				label="Аннотация"
				source="text"
			/>
			<ArrayField
				label="Авторы"
				source="authors"
			>
				<SingleFieldList linkType={false}>
					<ChipField
						label="Автор"
						source="author"
					/>
				</SingleFieldList>
			</ArrayField>
			<ReferenceArrayField
				label="Подразделения"
				reference="subdivisions"
				source="subdivisions"
			>
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceArrayField>
			<FileField
				source="file.url"
				title="file.title"
				label="PDF файл или архив"
				target="_blank"
			/>
		</SimpleShowLayout>
	</Show>
)
