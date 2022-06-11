import { ExpandLess } from '@mui/icons-material'
import { Chip, Collapse } from '@mui/material'
import { CountContext } from 'components/CountContext'
import { useContext, useEffect, useState } from 'react'
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
	const { getTotalCount } = useContext(CountContext)

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
	}, [isSidebarOpen, showTransition])

	const isPublications = name === 'menu.publications'

	return (
		<>
			<MenuItemLink
				to="#"
				primaryText={
					<>
						{translate(name)}
						{isSidebarOpen && (
							<>
								{isPublications && (
									<Chip
										size="small"
										label={getTotalCount()}
										sx={{ ml: 'auto', mr: 1, cursor: 'pointer' }}
									/>
								)}
								<ExpandLess
									sx={{
										transition: 'transform 300ms ease',
										...(!isOpen && { transform: 'rotate(180deg)' }),
									}}
								/>
							</>
						)}
					</>
				}
				leftIcon={isOpen && !isSidebarOpen ? <ExpandLess /> : icon}
				onClick={() => setIsOpen((e) => !e)}
			/>
			<Collapse in={isOpen} sx={{ a: menuItemStyle }}>
				{children}
			</Collapse>
		</>
	)
}
