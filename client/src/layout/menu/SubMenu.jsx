import ExpandMore from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import React from 'react'
import { MenuItemLink, useTranslate, useSidebarState } from 'react-admin'

const SubMenu = ({
	handleToggle,
	isOpen,
	name,
	icon,
	children,
}) => {
	const translate = useTranslate()
	const [isSidebarOpen] = useSidebarState()

	return (
		<>
			<MenuItemLink
				to='#'
				primaryText={translate(name)}
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
							pl: isSidebarOpen ? 4 : 2,
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
