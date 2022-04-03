import React from 'react'
import { NumberInput, TextField, TextInput } from 'react-admin'
import { ChipArrayField } from '../../components/fields'
import MyList from '../MyList'

const AbstractList = () => (
	<MyList
		filters={[
			<TextInput source='title' label='fields.search' alwaysOn/>,
			<TextInput source='description' label='fields.description'/>,
			<TextInput source='authors.author' label='fields.author'/>,
			<NumberInput source='year' label='fields.year'/>,
			<TextInput source='exitData' label='fields.exitData'/>,
		]}
	>
		<TextField source='title' label='fields.title'/>
		<ChipArrayField source='authors' label='fields.authors'/>
		<TextField source='year' label='fields.year'/>
	</MyList>
)

export default AbstractList
