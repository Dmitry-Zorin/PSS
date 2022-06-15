import { ExpandMore } from '@mui/icons-material'
import { Box, Collapse } from '@mui/material'
import { CountContext } from 'components/CountContext'
import { useContext, useEffect, useState } from 'react'
import { useSidebarState, useTranslate } from 'react-admin'
import { MenuChip } from './MenuChip'
import { MenuItemLink } from './MenuItemLink'

const PADDING = 7

export const SubMenu = ({ name, icon, children }) => {
	const translate = useTranslate()
	const [isSidebarOpen] = useSidebarState()
	const [isOpen, setIsOpen] = useState(true)
	const [menuItemStyle, setMenuItemStyle] = useState({
		pl: isSidebarOpen ? PADDING : undefined,
	})
	const [showTransition, setShowTransition] = useState(false)
	const { getTotalCount } = useContext(CountContext)

	useEffect(() => {
		setShowTransition(true)
		setTimeout(() => {
			setMenuItemStyle({
				pl: isSidebarOpen ? PADDING : undefined,
				...(showTransition && {
					transition: 'padding 195ms cubic-bezier(0.4, 0, 0.6, 1)',
				}),
			})
		})
	}, [isSidebarOpen, showTransition])

	const isPublications = name === 'menu.publications'

	return (
		<>
			<MenuItemLink
				to="#"
				primaryText={
					<>
						{icon}
						<Box sx={{ ml: 2 }}>
							{translate(name)}
							{isPublications && <MenuChip label={getTotalCount()} />}
						</Box>
					</>
				}
				leftIcon={
					<ExpandMore
						sx={[
							// { transition: 'transform 300ms ease' },
							!isOpen && { transform: 'rotate(-90deg)' },
						]}
					/>
				}
				onClick={() => setIsOpen((e) => !e)}
			/>
			<Collapse in={isOpen} sx={{ a: menuItemStyle, transition: 'none' }}>
				{children}
			</Collapse>
		</>
	)
}
