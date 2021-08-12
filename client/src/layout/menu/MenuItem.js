import { Chip } from '@material-ui/core'
import capitalize from 'just-capitalize'
import React from 'react'
import { MenuItemLink, useTranslate } from 'react-admin'

const MenuItem = ({ resource, data }) => {
	const translate = useTranslate()
	const { name, icon } = resource
	
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
							label={data[name] || 0}
							style={{ marginLeft: 15 }}
						/>
					)}
				</>
			}
			leftIcon={icon ? <icon/> : undefined}
		/>
	)
}

export default MenuItem
