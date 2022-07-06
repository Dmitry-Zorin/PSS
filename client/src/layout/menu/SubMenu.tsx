import { Divider, List } from '@mui/material'
import { Collapse, gentleConfig } from 'components'
import { SubMenuItem } from 'layout'
import { ReactElement, useState } from 'react'
import { useSidebarState } from 'react-admin'
import { animated, useSpring } from 'react-spring'

interface SubMenuProps {
	name: string
	children: ReactElement[]
}

const SubMenu = ({ name, children }: SubMenuProps) => {
	const [isOpen, setIsOpen] = useState(true)
	const [isSidebarOpen] = useSidebarState()

	return (
		<>
			<Divider sx={{ mx: 2, my: 1 }} />
			<SubMenuItem
				text={name}
				open={isOpen}
				onClick={() => setIsOpen((e) => !e)}
			/>
			<animated.div
				style={useSpring({
					paddingLeft: isSidebarOpen ? 40 : 0,
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
