import React from 'react'
import { AuthorsInput, CharacterInput, LargeTextInput, ReplaceFileInput, TypeInput, VolumeInput, YearInput } from '../../components/inputs'
import MyEdit from '../MyEdit'

const AbstractEdit = () => (
	<MyEdit>
		<LargeTextInput source='title' required/>
		<LargeTextInput source='description'/>
		<TypeInput/>
		<YearInput/>
		<VolumeInput/>
		<AuthorsInput/>
		<CharacterInput/>
		<LargeTextInput source='exitData'/>
		<ReplaceFileInput/>
	</MyEdit>
)

export default AbstractEdit
