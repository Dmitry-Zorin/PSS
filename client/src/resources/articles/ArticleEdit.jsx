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

export const ArticleEdit = (props) => (
	<Edit title='resources.articles.titles.edit' {...props}>
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
