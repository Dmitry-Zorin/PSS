import { Chip } from '@mui/material'
import capitalize from 'just-capitalize'
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
					{translate(`resources.${name}.name`, { _: capitalize(name) })}
					{resourcesCount && (
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
