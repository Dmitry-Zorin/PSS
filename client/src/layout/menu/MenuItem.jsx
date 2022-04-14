import { Chip } from '@mui/material'
import React from 'react'
import { MenuItemLink, useStore, useTranslate } from 'react-admin'

const MenuItem = ({ resource }) => {
	const translate = useTranslate()
	const [resourcesCount] = useStore('resources.count')

	const { name, icon: Icon } = resource

	return (
		<MenuItemLink
			to={`/${name}`}
			primaryText={
				<>
					{translate(`resources.${name}.name`, { smart_count: 2 })}
					{resourcesCount?.[name] !== undefined && (
						<Chip
							size='small'
							label={resourcesCount[name]}
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
