import React from 'react'
import { TextField } from 'react-admin'
import MyList from '../MyList'

const CharacterList = () => (
	<MyList sort={{ field: 'name', order: 'asc' }} datagridProps={{ rowClick: 'edit' }}>
		<TextField source='name' label='fields.name'/>
	</MyList>
)

export default CharacterList
