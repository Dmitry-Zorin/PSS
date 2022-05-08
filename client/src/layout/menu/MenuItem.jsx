import { Chip } from '@mui/material'
import React from 'react'
import { MenuItemLink, useStore, useTranslate } from 'react-admin'

const MenuItem = ({ resource }) => {
	const translate = useTranslate()
	const [resourcesCount] = useStore('resources.count')

	const { name, icon: Icon } = resource

	if (resourcesCount && !resourcesCount?.timeline) {
		const values = Object.values(resourcesCount)
		if (values.length) {
			resourcesCount.timeline = values.reduce((a, b) => a + b)
		}
	}

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
							sx={{ ml: '10px', cursor: 'pointer' }}
						/>
					)}
				</>
			}
			leftIcon={Icon ? <Icon/> : undefined}
		/>
	)
}

export default MenuItem
