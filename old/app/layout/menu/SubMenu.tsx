import { List } from '@mui/material'
import { animated, useSpring } from '@react-spring/web'
import type { ReactElement } from 'react'
import { useState } from 'react'
import { useSidebarState } from 'react-admin'
import { Collapse, gentleConfig } from '~/components'
import { SubMenuItem } from 'layout'

interface SubMenuProps {
	name: string
	children: ReactElement[]
}

const SubMenu = ({ name, children }: SubMenuProps) => {
	const [isOpen, setIsOpen] = useState(true)
	const [isSidebarOpen] = useSidebarState()

	return (
		<>
			{/* <Divider sx={{ mx: 2, my: 1 }} /> */}
			<SubMenuItem
				text={name}
				open={isOpen}
				onClick={() => setIsOpen((e) => !e)}
			/>
			<animated.div
				style={useSpring({
					paddingLeft: isSidebarOpen ? 44 : 0,
					config: gentleConfig,
				})}
			>
				<Collapse in={isOpen}>
					<List disablePadding>{children}</List>
				</Collapse>
			</animated.div>
		</>
	)
}

export default SubMenu
