import React from 'react'
import { AddFileInput, AuthorsInput, DescriptionInput, ExitDataInput, TitleInput, TypeInput, VolumeInput, YearInput } from '../../components/inputs'
import MyCreate from '../MyCreate'

const ArticleCreate = () => (
	<MyCreate>
		<TitleInput/>
		<DescriptionInput/>
		<TypeInput/>
		<YearInput/>
		<VolumeInput/>
		<AuthorsInput/>
		{/*<CharacterInput/>*/}
		<ExitDataInput/>
		<AddFileInput/>
	</MyCreate>
)

export default ArticleCreate
