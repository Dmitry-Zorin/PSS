import React from 'react'
import { ReplaceFileInput } from '../components/inputs'
import MyEdit from '../MyEdit'
import { CreateUpdateInputs } from './PublicationCreate'

const PublicationEdit = ({ children }) => (
	<MyEdit>
		<CreateUpdateInputs/>
		{children}
		<ReplaceFileInput/>
	</MyEdit>
)

export default PublicationEdit
