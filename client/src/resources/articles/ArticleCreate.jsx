import React from 'react'
import { Create, SimpleForm, useNotify, useRedirect } from 'react-admin'
import { AddFileInput, AuthorsInput, DescriptionInput, ExitDataInput, TitleInput, TypeInput, VolumeInput, YearInput } from '../../components/inputs'

const ArticleCreate = (props) => {
	const notify = useNotify()
	const redirect = useRedirect()

	const onSuccess = () => {
		notify('Resource added')
		redirect('/articles')
	}

	return (
		<Create
			title='resources.articles.titles.create'
			onSuccess={onSuccess}
			{...props}
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
}

export default ArticleCreate
