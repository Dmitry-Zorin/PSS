import { Chip } from '@material-ui/core'
import capitalize from 'just-capitalize'
import React from 'react'
import { MenuItemLink, useTranslate } from 'react-admin'
import { useSelector } from 'react-redux'

const MenuItem = ({ resource }) => {
	const translate = useTranslate()
	const resources = useSelector(state => state.admin.resources)

	const { name, icon } = resource
	const count = resources[name].list.total

	return (
		<MenuItemLink
			to={`/${name}`}
			primaryText={
				<>
					{translate(
						`resources.${name}.name`,
						{ _: capitalize(name) },
					)}
					{/*{data && (*/}
						<Chip
							size='small'
							label={count || 0}
							style={{ marginLeft: 15 }}
						/>
					{/*)}*/}
				</>
			}
			leftIcon={icon ? <icon/> : undefined}
		/>
	)
}

export default MenuItem
