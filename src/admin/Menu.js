import { useMediaQuery } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DefaultIcon from '@material-ui/icons/ViewList'
import React, { useState } from 'react'
import { getResources, MenuItemLink, usePermissions } from 'react-admin'
import { useSelector } from 'react-redux'
import SubMenu from './SubMenu'

const otherResources = [
	'publications',
	'subdivisions',
	'users'
]

const Menu = ({ onMenuClick, logout }) => {
	const isXSmall = useMediaQuery(theme => (
		theme.breakpoints.down('xs')
	))
	const open = useSelector(state => state.admin.ui.sidebarOpen)
	const resources = useSelector(getResources)
	const { permissions } = usePermissions()

	const [showOther, setShowOther] = useState(false)

	return (
		<>
			{resources.map(resource => (
				otherResources.includes(resource.name) ? null : (
					<MenuItemLink
						key={resource.name}
						to={`/${resource.name}`}
						primaryText={
							resource.options ? resource.options.label : resource.name
						}
						leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
						onClick={onMenuClick}
						sidebarIsOpen={open}
					/>
				)
			))}
			{!permissions ? null : (
				<SubMenu
					handleToggle={() => setShowOther(e => !e)}
					isOpen={showOther}
					sidebarIsOpen={open}
					name="ra.resources.other"
					icon={<MoreHorizIcon />}
				>
					{resources.map(resource => (
						!otherResources.includes(resource.name) ? null : (
							<MenuItemLink
								key={resource.name}
								to={`/${resource.name}`}
								primaryText={
									resource.options ? resource.options.label : resource.name
								}
								leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
								onClick={onMenuClick}
								sidebarIsOpen={open}
							/>
						)
					))}
				</SubMenu>
			)}
			{isXSmall && logout}
		</>
	)
}

export default Menu
