import { ExpandMore } from '@mui/icons-material'
import { Collapse } from '@mui/material'
import { useEffect, useState } from 'react'
import { MenuItemLink, useSidebarState, useTranslate } from 'react-admin'

const PADDING = 6

function createTransition(property, value, easing) {
	return ({ transitions, spacing }) => {
		return transitions.create([property], {
			duration: transitions.getAutoHeightDuration(+spacing(value).slice(0, -2)),
			easing: transitions.easing[easing],
		})
	}
}

export const SubMenu = ({ name, icon, children }) => {
	const translate = useTranslate()
	const [isSidebarOpen] = useSidebarState()
	const [isOpen, setIsOpen] = useState(true)
	const [menuItemStyle, setMenuItemStyle] = useState({
		pl: isSidebarOpen ? PADDING : undefined,
	})
	const [showTransition, setShowTransition] = useState(false)

	useEffect(() => {
		setShowTransition(true)
		setTimeout(() => {
			setMenuItemStyle({
				pl: isSidebarOpen ? PADDING : undefined,
				...(showTransition && {
					transition: createTransition(
						'padding-left',
						PADDING,
						isSidebarOpen ? 'easeOut' : 'easeIn',
					),
				}),
			})
		})
	}, [isSidebarOpen])

	return (
		<>
			<MenuItemLink
				to="#"
				primaryText={translate(name)}
				leftIcon={isOpen && !isSidebarOpen ? <ExpandMore /> : icon}
				onClick={() => setIsOpen((e) => !e)}
			/>
			<Collapse in={isOpen} sx={{ a: menuItemStyle }}>
				{children}
			</Collapse>
		</>
	)
}
