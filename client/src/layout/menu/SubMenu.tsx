import { ExpandMore } from '@mui/icons-material'
import { Box, List } from '@mui/material'
import { MenuItem } from 'layout'
import { Children, cloneElement, ReactElement, useState } from 'react'
import { animated, config, useSpring } from 'react-spring'

interface SubMenuProps {
	name: string
	icon: ReactElement
	children: ReactElement[]
}

const SUBMENU_ITEM_HEIGHT = 40

const AnimatedExpandMore = animated(ExpandMore)

const springConfig = {
	...config.gentle,
	mass: 0.5,
}

const SubMenu = ({ name, icon, children }: SubMenuProps) => {
	const [isOpen, setIsOpen] = useState(true)

	return (
		<>
			{/* <Divider sx={{ m: 2 }} /> */}
			<MenuItem
				icon={
					<Box pr={2} sx={{ transform: 'scale(0.8)' }}>
						<AnimatedExpandMore
							style={useSpring({
								rotate: isOpen ? 0 : -90,
								config: springConfig,
							})}
							sx={{ mr: -0.5 }}
						/>
						{icon}
					</Box>
				}
				text={name}
				sx={{
					pl: 0.5,
					mt: 2,
				}}
				onClick={() => setIsOpen((e) => !e)}
			/>
			<animated.div
				style={useSpring({
					height: isOpen ? children.length * SUBMENU_ITEM_HEIGHT + 2 : 0,
					overflow: 'hidden',
					config: springConfig,
				})}
			>
				<List component="div" disablePadding>
					{Children.map(children, (child) =>
						cloneElement(child, {
							sx: { pl: 'calc(9.7px + 15.75%)', height: SUBMENU_ITEM_HEIGHT },
						}),
					)}
				</List>
			</animated.div>
		</>
	)
}

// x + y * 2.99 = 56
// x + y * 0.4 = 16
// y = 40 / 2.54

export default SubMenu
