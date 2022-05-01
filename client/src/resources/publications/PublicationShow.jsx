import React from 'react'
import MyShow from '../MyShow'
import { showPublicationFields } from './components/fields'

const PublicationShow = () => (
	<MyShow children={showPublicationFields}/>
)

export default PublicationShow
