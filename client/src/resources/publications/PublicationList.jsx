import React from 'react'
import { ChipField, NumberInput, TextField, TextInput } from 'react-admin'
import { ChipArrayField } from '../components/fields'
import MyList from '../MyList'

const PublicationList = ({ children }) => (
	<MyList filters={[
		<TextInput source='title' label='fields.search' alwaysOn/>,
		<TextInput source='description' label='fields.description'/>,
		<NumberInput source='year' label='fields.year'/>,
		<TextInput source='authors.author' label='fields.author'/>,
		<TextInput source='outputData' label='fields.outputData'/>,
	]}>
		<TextField source='title' label='fields.title'/>,
		{children}
		<ChipArrayField source='authors' label='fields.authors'/>,
		<ChipField source='year' label='fields.year' emptyText='-'/>
	</MyList>
)

export default PublicationList
