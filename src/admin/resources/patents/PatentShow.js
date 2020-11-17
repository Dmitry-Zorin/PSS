import React from 'react'
import {
	ArrayField,
	ChipField,
	DateField, FileField,
	ReferenceArrayField,
	Show,
	SimpleShowLayout,
	SingleFieldList,
	TextField
} from 'react-admin'
import { createTitle, getShowActions } from '../../utils'

const Title = createTitle('Петент', 'headline')

const ShowActions = getShowActions()

export const PatentShow = ({ permissions, enableActions = true, ...props }) => {
	const actions = enableActions ? <ShowActions permissions={permissions} /> : undefined
	return (
		<Show
			title={<Title />}
			actions={actions}
			{...props}
		>
			<SimpleShowLayout>
				<TextField
					label="Название"
					source="headline"
				/>
				<TextField
					label="Описание"
					source="description"
				/>
				<DateField
					label="Дата создания"
					source="creationDate"
					locales="ru-RU"
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
					source="subdivisions"
					reference="subdivisions"
				>
					<SingleFieldList>
						<ChipField source="name" />
					</SingleFieldList>
				</ReferenceArrayField>
				<FileField
					label="Архив"
					source="file.url"
					title="file.title"
					target="_blank"
				/>
				<ChipField
					label='Код свидетельства'
					source='certificate.code'
				/>
				<FileField
					label="Свидетельство"
					source="certificate.file.url"
					title="certificate.code"
					target="_blank"
				/>
			</SimpleShowLayout>
		</Show>
	)
}
