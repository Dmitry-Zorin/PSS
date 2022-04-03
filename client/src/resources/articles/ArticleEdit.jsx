import React from 'react'
import { Edit, SimpleForm } from 'react-admin'
import {
	AuthorsInput,
	DescriptionInput,
	ExitDataInput,
	ReplaceFileInput,
	TitleInput,
	TypeInput,
	VolumeInput,
	YearInput,
} from '../../components/inputs'

const ArticleEdit = () => (
	<Edit title='resources.articles.titles.edit'>
		<SimpleForm>
			<TitleInput/>
			<DescriptionInput/>
			<TypeInput resource='articles'/>
			<YearInput/>
			<VolumeInput/>
			<AuthorsInput/>
			{/*<CharacterInput/>*/}
			<ExitDataInput/>
			<ReplaceFileInput/>
		</SimpleForm>
	</Edit>
)

export default ArticleEdit
