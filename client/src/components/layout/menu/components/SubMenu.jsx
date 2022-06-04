import { ExpandMore } from '@mui/icons-material'
import { Collapse } from '@mui/material'
import { useEffect, useState } from 'react'
import { MenuItemLink, useSidebarState, useTranslate } from 'react-admin'

export const SubMenu = ({ name, icon, children }) => {
	const translate = useTranslate()
	const [isSidebarOpen] = useSidebarState()
	const [isOpen, setIsOpen] = useState(true)
	const [padding, setPadding] = useState()

	useEffect(() => {
		setPadding(isSidebarOpen ? '35px' : undefined)
	}, [isSidebarOpen])

	return (
		<>
			<MenuItemLink
				to="#"
				primaryText={translate(name)}
				leftIcon={isOpen && !isSidebarOpen ? <ExpandMore /> : icon}
				onClick={() => setIsOpen((e) => !e)}
			/>
			<Collapse
				in={isOpen}
				sx={{
					a: {
						pl: padding,
						transition: `padding-left 200ms ${
							isSidebarOpen ? 'ease-out' : 'ease-in'
						}`,
					},
				}}
			>
				{children}
			</Collapse>
		</>
	)
}
