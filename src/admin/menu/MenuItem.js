import { Chip } from '@material-ui/core'
import React from 'react'
import { MenuItemLink } from 'react-admin'

export const MenuItem = ({ resource, data }) => (
	<MenuItemLink
		to={`/${resource.name}`}
		primaryText={
			<>
				{resource?.options?.label || resource.name}
				{data && (
					<Chip
						size='small'
						label={data[resource.name]}
						style={{ marginLeft: 15 }}
					/>
				)}
			</>
		}
		leftIcon={resource.icon ? <resource.icon/> : undefined}
	/>
)

export default MenuItem
