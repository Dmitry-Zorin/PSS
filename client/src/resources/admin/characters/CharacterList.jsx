import React from 'react'
import { TextField, TextInput } from 'react-admin'
import MyList from '../../MyList'

const CharacterList = () => (
	<MyList
		filters={[<TextInput source="name" label="fields.name" alwaysOn />]}
		sort={{ field: 'name', order: 'asc' }}
		datagridProps={{ rowClick: 'edit' }}
	>
		<TextField source="name" label="fields.name" />
	</MyList>
)

export default CharacterList
