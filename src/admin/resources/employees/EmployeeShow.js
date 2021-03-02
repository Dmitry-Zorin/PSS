import { GridShowLayout, RaGrid } from 'ra-compact-ui/dist/details'
import React from 'react'
import { ArrayField, ChipField, FileField, ReferenceArrayField, Show, SingleFieldList, TextField } from 'react-admin'
import PhotoPlaceholderImg from '../../../../static/images/photo-placeholder.jpg'
import { createTitle, getShowActions } from '../../utils'

const Title = createTitle('Сотрудник', 'headline')
const TitleShort = createTitle('', 'headline')

const ShowActions = getShowActions()

export const EmployeeShow = ({ permissions, enableActions = true, ...props }) => (
	<Show
		title={enableActions ? <Title /> : <TitleShort />}
		actions={!enableActions ? undefined : (
			<ShowActions permissions={permissions} />
		)}
		{...props}
	>
		<GridShowLayout>
			<RaGrid container spacing={2}>
				<RaGrid item xs={4}>
					<img
						style={{ display: 'block', maxWidth: '100%' }}
						src={PhotoPlaceholderImg}
					/>
				</RaGrid>
				<RaGrid item xs={8}>
					<TextField
						label="Название"
						source="headline"
					/>
					<TextField
						label="Описание"
						source="text"
					/>
				</RaGrid>
			</RaGrid>
			<ArrayField
				label="Ключевые слова"
				source="tags"
			>
				<SingleFieldList linkType={false}>
					<ChipField
						label="Ключевое слово"
						source="tag"
					/>
				</SingleFieldList>
			</ArrayField>
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
				source="subdivisions"
				reference="subdivisions"
			>
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceArrayField>
			<FileField
				label="Файл"
				source="file.url"
				title="file.title"
				target="_blank"
			/>
		</GridShowLayout>
	</Show>
)
