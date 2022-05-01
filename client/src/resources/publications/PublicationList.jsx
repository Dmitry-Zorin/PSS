import React from 'react'
import MyList from '../MyList'
import { listPublicationFields } from './components/fields'
import { publicationFilters } from './components/inputs'

const PublicationList = () => (
	<MyList
		filters={publicationFilters}
		children={listPublicationFields}
	/>
)

export default PublicationList
