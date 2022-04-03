import React from 'react'
import { Show, SimpleShowLayout } from 'react-admin'
import {
	AuthorsField,
	DescriptionField,
	DownloadFileField,
	ExitDataField,
	TitleField,
	TypeField,
	VolumeField,
	YearField,
} from '../../components/fields'
import { ShowActions } from '../../components/old'

const ArticleShow = ({ permissions }) => (
	<Show
		title='resources.articles.titles.show'
		actions={<ShowActions permissions={permissions}/>}
	>
		<SimpleShowLayout>
			<TitleField/>
			<DescriptionField/>
			<TypeField/>
			<YearField/>
			<VolumeField/>
			<AuthorsField/>
			{/*<CharacterField/>*/}
			<ExitDataField/>
			<DownloadFileField/>
		</SimpleShowLayout>
	</Show>
)

export default ArticleShow
