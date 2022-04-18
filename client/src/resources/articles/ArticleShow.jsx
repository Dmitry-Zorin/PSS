import React from 'react'
import { AuthorsField, DescriptionField, CharacterField, DownloadFileField, ExitDataField, TitleField, TypeField, VolumeField, YearField } from '../../components/fields'
import MyShow from '../MyShow'

const ArticleShow = () => (
	<MyShow>
		<TitleField/>
		<DescriptionField/>
		<TypeField/>
		<YearField/>
		<VolumeField/>
		<AuthorsField/>
		<CharacterField/>
		<ExitDataField/>
		<DownloadFileField/>
	</MyShow>
)

export default ArticleShow
