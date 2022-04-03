import React from 'react'
import { Create, SimpleForm } from 'react-admin'
import { AddFileInput, AuthorsInput, DescriptionInput, ExitDataInput, TitleInput, TypeInput, VolumeInput, YearInput } from '../../components/inputs'

const ArticleCreate = () => (
	<Create
		title='resources.articles.titles.create'
		redirect='list'
	>
		<SimpleForm>
			<TitleInput/>
			<DescriptionInput/>
			<TypeInput resource='articles'/>
			<YearInput/>
			<VolumeInput/>
			<AuthorsInput/>
			{/*<CharacterInput/>*/}
			<ExitDataInput/>
			<AddFileInput/>
		</SimpleForm>
	</Create>
)

export default ArticleCreate
