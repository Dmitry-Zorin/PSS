import Collapse from '@material-ui/core/Collapse'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMore from '@material-ui/icons/ExpandMore'
import capitalize from 'just-capitalize'
import React from 'react'
import { MenuItemLink, useTranslate } from 'react-admin'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
	active: {
		boxShadow: 'none',
		background: 'transparent',
	},
	sidebarIsOpen: {
		'& a': {
			paddingLeft: theme.spacing(4),
		},
	},
	sidebarIsClosed: {
		'& a': {
			paddingLeft: theme.spacing(2),
		},
	},
}))

const SubMenu = ({
	handleToggle,
	isOpen,
	name,
	icon,
	children,
}) => {
	const translate = useTranslate()
	const classes = useStyles()
	const sidebarIsOpen = useSelector(state => state.admin.ui.sidebarOpen)
	
	return (
		<>
			<MenuItemLink
				to='#'
				primaryText={translate(name, { _: capitalize(name) })}
				leftIcon={isOpen ? <ExpandMore/> : icon}
				onClick={handleToggle}
				className={classes.active}
			/>
			<Collapse in={isOpen} timeout='auto' unmountOnExit>
				<div
					className={
						sidebarIsOpen
							? classes.sidebarIsOpen
							: classes.sidebarIsClosed
					}
				>
					{children}
				</div>
			</Collapse>
		</>
	)
}

export default SubMenu
