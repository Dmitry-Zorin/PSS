import ExpandMore from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import capitalize from 'just-capitalize'
import React from 'react'
import { MenuItemLink, useTranslate } from 'react-admin'
import { useSelector } from 'react-redux'

const SubMenu = ({
	handleToggle,
	isOpen,
	name,
	icon,
	children,
}) => {
	const translate = useTranslate()
	const sidebarIsOpen = useSelector(state => state.admin.ui.sidebarOpen)

	return (
		<>
			<MenuItemLink
				to='#'
				primaryText={translate(name, { _: capitalize(name) })}
				leftIcon={isOpen ? <ExpandMore/> : icon}
				onClick={handleToggle}
				sx={{
					boxShadow: 'none',
					background: 'transparent',
				}}
			/>
			<Collapse in={isOpen} timeout='auto' unmountOnExit>
				<Box
					sx={{
						'& a': {
							paddingLeft: sidebarIsOpen ? 4 : 2,
						},
					}}
				>
					{children}
				</Box>
			</Collapse>
		</>
	)
}

export default SubMenu
