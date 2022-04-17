import React from 'react'
import { AddFileInput, AuthorsInput, CharacterInput, LargeTextInput, TypeInput, VolumeInput, YearInput } from '../../components/inputs'
import MyCreate from '../MyCreate'

const DissertationCreate = () => (
	<MyCreate>
		<LargeTextInput source='title' required/>
		<LargeTextInput source='description'/>
		<TypeInput/>
		<YearInput/>
		<VolumeInput/>
		<AuthorsInput/>
		<CharacterInput/>
		<LargeTextInput source='exitData'/>
		<AddFileInput/>
	</MyCreate>
)

export default DissertationCreate
