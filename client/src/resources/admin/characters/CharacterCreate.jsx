import React from 'react'
import { LargeTextInput } from '../../components/inputs'
import MyCreate from '../../MyCreate'

const CharacterCreate = () => (
	<MyCreate>
		<LargeTextInput source="name" required />
	</MyCreate>
)

export default CharacterCreate
