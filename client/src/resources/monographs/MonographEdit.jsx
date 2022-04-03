import React from 'react'
import { AuthorsInput, DescriptionInput, ExitDataInput, ReplaceFileInput, TitleInput, TypeInput, VolumeInput, YearInput } from '../../components/inputs'
import MyEdit from '../MyEdit'

const MonographEdit = () => (
	<MyEdit>
		<TitleInput/>
		<DescriptionInput/>
		<TypeInput/>
		<YearInput/>
		<VolumeInput/>
		<AuthorsInput/>
		{/*<CharacterInput/>*/}
		<ExitDataInput/>
		<ReplaceFileInput/>
	</MyEdit>
)

export default MonographEdit
