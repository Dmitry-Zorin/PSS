import { Chip } from '@mui/material'
import capitalize from 'just-capitalize'
import React from 'react'
import { MenuItemLink, useResourceDefinitions, useTranslate } from 'react-admin'

const MenuItem = ({ resource, data }) => {
	const translate = useTranslate()
	const resourcesDefinitions = useResourceDefinitions()
	const resources = Object.keys(resourcesDefinitions).map(name => resourcesDefinitions[name])

	const { name, icon: Icon } = resource
	const count = 0//resources[name].list.total

	return (
		<MenuItemLink
			to={`/${name}`}
			primaryText={
				<>
					{translate(
						`resources.${name}.name`,
						{ _: capitalize(name) },
					)}
					{data && (
						<Chip
							size='small'
							label={count || data[name] || 0}
							style={{ marginLeft: 15 }}
						/>
					)}
				</>
			}
			leftIcon={Icon ? <Icon/> : undefined}
		/>
	)
}

export default MenuItem
