import { Chip } from '@material-ui/core'
import React from 'react'
import { MenuItemLink } from 'react-admin'

const MenuItem = ({ resource, data }) => (
	<MenuItemLink
		to={`/${resource.name}`}
		primaryText={
			<>
				{resource.name}
				{data && (
					<Chip
						size='small'
						label={data[resource.name] || 0}
						style={{ marginLeft: 15 }}
					/>
				)}
			</>
		}
		leftIcon={resource.icon ? <resource.icon/> : undefined}
	/>
)

export default MenuItem
